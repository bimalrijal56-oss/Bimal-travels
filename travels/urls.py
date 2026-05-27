from django.urls import path
from .views import *

urlpatterns = [
    path('travels',TravelsList.as_view()),
    path('travels/<int:pk>', TravelsItem.as_view()),
    path('guides/', GuideList.as_view()),
    path('guides/<int:pk>', GuideItem.as_view()),
    path('reviews/', ReviewList.as_view()),
    path('reviews/<int:pk>', ReviewItem.as_view()),
    path('bookings/', BookingList.as_view()),
    path('travel_booking/<int:travel_id>', TravelBooking,name='travel_booking'),
]
