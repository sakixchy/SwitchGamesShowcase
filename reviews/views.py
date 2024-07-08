from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Review
from .serializers import ReviewSerializer
from drf_api_sgr.permissions import IsOwnerOrReadOnly


class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Review.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['game']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Review.objects.all()
