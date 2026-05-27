from .models import *
from rest_framework import serializers

class DayPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayPlan
        fields = ['name', 'description']

class TravelsSerializers(serializers.ModelSerializer):
    day_by_day = DayPlanSerializer(read_only=True)
    best_guide_name = serializers.CharField(source='best_guide.name', read_only=True)

    class Meta:
        model = Travels
        fields = [ 'id','title','image','country','region','trending','difficulty','max_people','per_person_fee','time_of_completion','best_season','day_by_day','best_guide','best_guide_name','details','rating']
        

            
class GuideSerializers(serializers.ModelSerializer):
     class Meta:
         model = Guide
         fields = ['id','name','phone','experience_years','image','bio','badge','charges','languages','rating','fb_link','insta_link','tiktok_link','youtube_link','twitter_link']
         
         
         
         
class ReviewSerializers(serializers.ModelSerializer):
    user_name = serializers.CharField(source = 'customer.name', read_only=True)
    user_image = serializers.ImageField(source = 'customer.image', read_only=True)
    user_address = serializers.CharField(source = 'customer.address', read_only=True)
    class Meta:
         model = Review
         fields = ['customer','rating','comment','user_name','user_image','user_address']
         
         
class BookingSerializers(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    travel_details = TravelsSerializers(source='travel', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'customer',
            'customer_name',
            'travel',
            'travel_details',
            'date',
            'total_people',
            'total_amount',
            'transaction_id',
            'status',
            'payment_status',
            'booked_at',
        ]