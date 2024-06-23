from django.http import Http404
from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Rental
from .serializers import RentalSerializer
from drf_api_sgr.permissions import IsRenterOrReadOnly


class RentalList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    ordering = ['-created_at']  

    def perform_create(self, serializer):
        serializer.save(renter=self.request.user)

    def get_queryset(self):
        return Rental.objects.all()

    def perform_create(self, serializer):
        serializer.save(renter=self.request.user)

class RentalDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a rental instance.
    """
    permission_classes = [IsRenterOrReadOnly]
    serializer_class = RentalSerializer

    def get_queryset(self):
        return Rental.objects.all()