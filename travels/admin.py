from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Travels)
class TravelsAdmin(admin.ModelAdmin):
    list_display = ['id','title','country','region','difficulty','per_person_fee','best_season']
    search_fields = ['title','region']
    list_filter = ['difficulty','best_season']
    
@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ['name','phone','experience_years','charges','languages']
    search_fields = ['name', 'languages']
    list_filter = ['experience_years', 'languages']
    

@admin.register(DayPlan)    
class DayPlanAdmin(admin.ModelAdmin):
    list_display = ['day_number',]
    

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['customer','rating']
    
@admin.register(Customers)
class CustomersAdmin(admin.ModelAdmin):
    list_display = ['name','address','phone']
    
    
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['customer','travel','date','status']
