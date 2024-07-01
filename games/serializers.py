from rest_framework import serializers
from .models import Game
from likes.models import Like


class GameSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    is_owner = serializers.SerializerMethodField()
    

    def validate_cover_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError('Image size larger than 2MB!')
        if value.image.height > 4096:
            raise serializers.ValidationError('Image height larger than 4096px!')
        if value.image.width > 4096:
            raise serializers.ValidationError('Image width larger than 4096px!')
        return value

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return request.user == obj.owner if request else False

    def get_like_id(self, obj):
        request = self.context.get('request')
        user = request.user if request else None
        if user and user.is_authenticated:
            like = Like.objects.filter(owner=user, game=obj).first()
            return like.id if like else None
        return None

    class Meta:
        model = Game
        fields = [
            'id', 'owner', 'title', 'description', 'cover_image',
            'created_at', 'updated_at','profile_id', 'profile_image',
            'is_owner', 'likes_count','comments_count', 'like_id', 'genre',
        ]
