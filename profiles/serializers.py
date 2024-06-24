from rest_framework import serializers
from .models import Profile
from follower.models import Follower
from .models import Game
from games.serializers import GameSerializer


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    games_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    wishlist = GameSerializer(many=True, read_only=True)
 

     

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    
    def get_following_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner
            ).first()
            return following.id if following else None
        return None


    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'name', 'bio', 'image',
            'created_at','updated_at', 'is_owner',
            'following_id','games_count', 'followers_count',
            'following_count', 'wishlist',
          
        ]

