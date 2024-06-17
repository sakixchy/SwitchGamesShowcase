from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from drf_api_sgr.permissions import IsRenterOrReadOnly

class ChatListCreateView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]  

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(sender=user) | Chat.objects.filter(receiver=user)

    def perform_create(self, serializer):
        sender = self.request.user
        receiver_username = self.request.data.get('receiver_username')
        game_id = self.request.data.get('game_id')

        if not receiver_username or not game_id:
            raise ValidationError('Receiver username and game ID are required.')

        try:
            receiver = User.objects.get(username=receiver_username)
            game = Game.objects.get(pk=game_id)
            serializer.save(sender=sender, receiver=receiver, game=game)
        except User.DoesNotExist:
            raise ValidationError('Receiver user does not exist.')
        except Game.DoesNotExist:
            raise ValidationError('Game does not exist.')

class ChatRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated, IsRenterOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(sender=user) | Chat.objects.filter(receiver=user)



class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsRenterOrReadOnly]

    def get_queryset(self):
        chat_id = self.kwargs.get('chat_id')
        return Message.objects.filter(chat_id=chat_id)

    def perform_create(self, serializer):
        print('IN PERFORM_CREATE FUNCTION')
        chat_id = self.kwargs.get('chat_id')
        print('chat_id: ', chat_id)
        try:
            print('IN TRY BLOCK')
            print('chat_id: ', chat_id)
            print('CHAT: ', Chat.objects.get(pk=chat_id))
            chat = Chat.objects.get(pk=chat_id)
            print('CHAT: ', chat)
            print('SERIALIZER: ', serializer)
            serializer.save(chat=chat, sender=self.request.user)
        except Exception as e:
            print("------e------", e)
        # except Chat.DoesNotExist:
        #     raise ValidationError('Chat does not exist.')
