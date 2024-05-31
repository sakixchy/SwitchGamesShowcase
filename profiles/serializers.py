from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')


    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'name', 'bio', 'image',
            'favorite_renters', 'created_at',
            'updated_at'
        ]

