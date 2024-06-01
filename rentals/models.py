from django.db import models
from django.contrib.auth.models import User
from games.models import Game


class Rental(models.Model):
    renter = models.ForeignKey(
        User, related_name='rentals', on_delete=models.CASCADE
        )
    game = models.ForeignKey(
        Game, related_name='rentals', on_delete=models.CASCADE
        )
    rental_start_date = models.DateField()
    rental_end_date = models.DateField()
    status = models.CharField(max_length=50, choices=[
        ('requested', 'Requested'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('returned', 'Returned')
    ], default='requested')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.renter.username} renting {self.game.title}'