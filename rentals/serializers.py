from rest_framework import serializers
from .models import Rental

class RentalSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='renter.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='renter.profile.id')
    profile_image = serializers.ReadOnlyField(source='renter.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user.id == obj.renter.id


    class Meta:
       model = Rental
        
       fields = [
          'id', 'owner', 'renter', 'game', 'rental_start_date',
          'rental_end_date', 'status', 'created_at',
          'updated_at','is_owner','profile_id',
          'profile_image'

       ]