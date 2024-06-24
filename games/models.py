from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    GENRE_CHOICES = [
        ('platformer', 'Platformer'),
        ('racing', 'Racing'),
        ('rpg', 'RPG'),
        ('action', 'Action'),
        ('adventure', 'Adventure'),
        ('fighting', 'Fighting'),
        ('classic', 'Classic'),
    ]

    owner = models.ForeignKey(User, related_name='owned_games', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='game_covers/')
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES, default='adventure')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

   

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
