from rest_framework import serializers
from .models import Review
from games.models import Game


class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    user_id = serializers.ReadOnlyField(source='owner.id')
    game_title = serializers.ReadOnlyField(source='game.title')
    game_genre = serializers.ReadOnlyField(source='game.genre')
    game_cover_image = serializers.ImageField(source='game.cover_image', read_only=True)
    profile_image = serializers.ImageField(source='owner.profile.image', read_only=True)
    rating_display = serializers.SerializerMethodField()

    def get_rating_display(self, obj):
        return obj.get_rating_display()

        

    class Meta:
        model = Review
        fields = [
            'id', 'owner', 'game', 'game_title', 'game_genre', 'game_cover_image',
            'user_id','title', 'content', 'rating',
            'created_at', 'updated_at', 'rating_display', 'profile_image',
        ]