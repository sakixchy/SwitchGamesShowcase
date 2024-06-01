from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Rental
from .serializers import RentalSerializer
from drf_api_sgr.permissions import IsRenterOrReadOnly

class RentalList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = RentalSerializer
    def get(self, request):
        rentals = Rental.objects.all()
        serializer = RentalSerializer(
            rentals, context={'request': request}, many=True
            )
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = RentalSerializer(
            data=request.data, context={'request': request}
            )
        if serializer.is_valid():
            serializer.save(renter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RentalDetail(APIView):
    permission_classes = [IsRenterOrReadOnly]
    serializer_class = RentalSerializer
    def get_object(self, pk):
        try:
            return Rental.objects.get(pk=pk)
        except Rental.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        rental = self.get_object(pk)
        serializer = RentalSerializer(rental, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        rental = self.get_object(pk)
        serializer = RentalSerializer(
            rental, data=request.data, context={'request': request}
            )
        if serializer.is_valid():
            serializer.save(renter=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        rental = self.get_object(pk)
        rental.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)