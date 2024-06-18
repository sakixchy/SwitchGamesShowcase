from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    owner = models.ForeignKey(
        User, related_name='owned_games', on_delete=models.CASCADE
        )
    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='game_covers/')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
