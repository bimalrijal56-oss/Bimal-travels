from django.shortcuts import render
from rest_framework import generics,permissions,status
from .models import *
from .serializers import *
from rest_framework.validators import ValidationError
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.db import IntegrityError
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# Create your views here.

class TravelsList(generics.ListCreateAPIView):
    queryset = Travels.objects.all()
    serializer_class = TravelsSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def perform_create(self, serializer):
        serializer.save()
        
        
class TravelsItem(generics.RetrieveDestroyAPIView):
    queryset = Travels.objects.all()
    serializer_class = TravelsSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def delete(self, request, *args, **kwargs):
        travels = Travels.objects.filter(id = self.kwargs['pk'])
        if travels.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            return ValidationError("Travels not found",status = status.HTTP_404_NOT_FOUND )
        
        
   
   
   
   
        
        
class GuideList(generics.ListCreateAPIView):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def perform_create(self, serializer):
        serializer.save()
        
        
class GuideItem(generics.RetrieveDestroyAPIView):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def delete(self, request, *args, **kwargs):
        travels = Guide.objects.filter(id = self.kwargs['pk'])
        if travels.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            return ValidationError("Guide not found",status = status.HTTP_404_NOT_FOUND )
        
        
        

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def perform_create(self, serializer):
        serializer.save()
        
        
class ReviewItem(generics.RetrieveDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def delete(self, request, *args, **kwargs):
        travels = Review.objects.filter(id = self.kwargs['pk'])
        if travels.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            return ValidationError("Review not found",status = status.HTTP_404_NOT_FOUND )


class BookingList(generics.ListCreateAPIView):
    queryset = Booking.objects.all().order_by('-booked_at')
    serializer_class = BookingSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def delete(self, request, *args, **kwargs):
        travels = Booking.objects.filter(id = self.kwargs['pk'])
        if travels.exists():
            return self.destroy(request,*args,**kwargs)
        else:
            return ValidationError("Booking not found",status = status.HTTP_404_NOT_FOUND )
    
    
    def perform_create(self, serializer):
        serializer.save()
        
        
        
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            username = data.get('username', '').strip()
            email = data.get('email', '').strip()
            password = data.get('password', '')

            if not username or not password:
                return JsonResponse({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, email=email, password=password)
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse(
                {
                    'token': str(token),
                    'username': user.username,
                    'email': user.email,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as error:
            return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
        

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            username = data.get('username', '').strip()
            password = data.get('password', '')

            user = authenticate(request, username=username, password=password)
            if user is None:
                return JsonResponse({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse(
                {
                    'token': str(token),
                    'username': user.username,
                    'email': user.email,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as error:
            return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            
            
   
@csrf_exempt
def TravelBooking(request, travel_id):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            customer_name = data.get('customer_name', '').strip()
            if not customer_name:
                return JsonResponse({'error': 'Customer name is required'}, status=status.HTTP_400_BAD_REQUEST)

            travel = Travels.objects.get(id=travel_id)
            date = data.get('date')
            total_people = int(data.get('total_people', 1))
            total_amount = travel.per_person_fee * total_people
            transaction_id = data.get('transaction_id', '').strip()

            if not date:
                return JsonResponse({'error': 'Date is required'}, status=status.HTTP_400_BAD_REQUEST)

            if not transaction_id:
                return JsonResponse({'error': 'Transaction ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            customer, _ = Customers.objects.get_or_create(
                name=customer_name,
                defaults={
                    'image': 'static/Customers/default.png',
                    'address': 'Not provided',
                    'phone': 'Not provided',
                },
            )

            Booking.objects.create(
                customer=customer,
                travel=travel,
                date=date,
                total_people=total_people,
                total_amount=total_amount,
                transaction_id=transaction_id,
            )
            return JsonResponse({'message': 'Booking successful'}, status=status.HTTP_201_CREATED)
        except Travels.DoesNotExist:
            return JsonResponse({'error': 'Travel not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:  
            return JsonResponse({'error': str(error)}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        
