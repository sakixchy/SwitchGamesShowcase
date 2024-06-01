from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user == obj.owner
        return False

    class Meta:
        model = Game
        fields = [
            'id', 'owner', 'title', 'description', 'cover_image',
            'is_available', 'created_at', 'updated_at', 'is_owner',
            'profile_id', 'profile_image'
        ]
