from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer
from drf_api_sgr.permissions import IsOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['game']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
