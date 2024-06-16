from django.urls import path
from .views import ChatListCreateView, ChatRetrieveUpdateDestroyView, MessageListCreateView

urlpatterns = [
    path('chats/', ChatListCreateView.as_view(), name='chat-list-create'),
    path('chats/<int:pk>/', ChatRetrieveUpdateDestroyView.as_view(), name='chat-retrieve-update-destroy'),
    path('chats/<int:chat_id>/messages/', MessageListCreateView.as_view(), name='message-list-create'),
]
