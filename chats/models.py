from django.db import models
from django.contrib.auth.models import User
from games.models import Game  


class Chat(models.Model):
    sender = models.ForeignKey(User, related_name='sent_chats',
     on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_chats',
     on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    def __str__(self):
        return f"Chat between {self.sender.username} and {self.receiver.username} about {self.game.title}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} in chat {self.chat.id} at {self.timestamp}"