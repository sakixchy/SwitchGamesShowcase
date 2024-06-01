from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Rental
from .serializers import RentalSerializer

class RentalList(APIView):
    serializer_class = RentalSerializer
    def get(self, request):
        rentals = Rental.objects.all()
        serializer = RentalSerializer(
            rentals, context={'request': request}, many=True
            )
        return Response(serializer.data)

    def post(self, request):
        serializer = RentalSerializer(
            data=request.data, context={'request': request}
            )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RentalDetail(APIView):
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
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        rental = self.get_object(pk)
        rental.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)