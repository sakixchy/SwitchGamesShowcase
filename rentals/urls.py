from django.urls import path
from rentals import views


urlpatterns = [
    path('rentals/', views.RentalList.as_view()),
    path('rentals/<int:pk>/', views.RentalDetail.as_view()),
]