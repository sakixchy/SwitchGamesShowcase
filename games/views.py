from django.http import Http404
from rest_framework import permissions,generics, filters
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
    queryset = Game.objects.all()
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    search_fields = ['title', 'description'] 
    ordering_fields = ['created_at', 'title']  

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
    """
    Retrieve, update, or delete a game instance.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = GameSerializer

    def get_object(self, pk):
        try:
            game = Game.objects.get(pk=pk)
            self.check_object_permissions(self.request, game)
            return game
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk):
        game = self.get_object(pk)
        serializer = GameSerializer(game, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        game = self.get_object(pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)