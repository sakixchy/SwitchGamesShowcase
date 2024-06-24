from rest_framework import serializers
from .models import Review
from games.models import Game
from django.contrib.auth.models import User

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_username = serializers.ReadOnlyField(source='user.username')
    reviewer_profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    game_title = serializers.ReadOnlyField(source='game.title')
    game_cover_image = serializers.ReadOnlyField(source='game.cover_image.url')

    class Meta:
        model = Review
        fields = ('id', 'reviewer_username',
         'reviewer_profile_image', 'game_title', 'game_cover_image',
        'title', 'content', 'rating', 'created_at', 
        )
