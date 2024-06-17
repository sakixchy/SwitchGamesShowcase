from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


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

@receiver(post_save, sender=Game)
def create_chat_on_game_creation(sender, instance, created, **kwargs):
    if created:
        sender_user = instance.owner  
        receiver_user = sender_user 
        
        Chat.objects.create(sender=sender_user, receiver=receiver_user, game=instance)