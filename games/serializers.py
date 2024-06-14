from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    class Meta:
        model = Game
        fields = [
            'id', 'owner', 'title', 'description', 'cover_image',
            'is_available', 'created_at', 'updated_at',
            'profile_id', 'profile_image'
        ]
