from django.db.models import Count
from django.http import Http404
from rest_framework import permissions, generics, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer
from drf_api_sgr.permissions import IsOwnerOrReadOnly



class GameList(generics.ListCreateAPIView):
    """
    List games or create a game if logged in.
    The perform_create method associates the game with the logged in user.
    """
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Game.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'likes__owner__profile',
        'owner__profile',
    ]
    search_fields = [
        'owner__username',
        'title',
    ]
    ordering_fields = [
        'likes_count',
        'comments_count',
        'likes__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = GameSerializer

    def get_object(self, pk):
        try:
        
            return Game.objects.annotate(
                likes_count=Count('likes', distinct=True),
                comments_count=Count('comment', distinct=True)
            ).get(pk=pk)
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        game = self.get_object(pk)
        self.check_object_permissions(request, game)  
        serializer = GameSerializer(game, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        game = self.get_object(pk)
        self.check_object_permissions(request, game)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)