from django.db import models
from django.contrib.auth.models import User


# Create your models here.




# Model for  travels


class Travels(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='static/Travels/')
    country = models.CharField(max_length=50)
    region = models.CharField(max_length=20)
    DIFFICULTY_CHOICES = [('easy','Easy'),('moderate','Moderate'),('hard','Hard')]
    difficulty = models.CharField(max_length=20,choices=DIFFICULTY_CHOICES)
    max_people = models.IntegerField()
    per_person_fee = models.DecimalField(max_digits=10,decimal_places=2)
    time_of_completion = models.PositiveBigIntegerField()
    SEASON_CHOICES = [('spring', 'Spring'), ('summer', 'Summer'), ('autumn', 'Autumn'), ('winter', 'Winter')]
    best_season = models.CharField(max_length=20,choices=SEASON_CHOICES)
    details = models.TextField() 
    day_by_day = models.ForeignKey('DayPlan',on_delete=models.CASCADE, blank=True)
    best_guide = models.ForeignKey('Guide',on_delete= models.CASCADE,blank=True)
    trending = models.BooleanField(default=False)
    rating = models.IntegerField(default=0)
    favorite = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    


    

class Guide(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    languages = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    experience_years = models.PositiveIntegerField()
    image = models.ImageField(upload_to='static/Guides/', null=True, blank=True)
    badge = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField()
    charges = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.IntegerField(default=0)
    fb_link = models.URLField(null=True, blank=True)
    insta_link = models.URLField(null=True, blank=True)
    tiktok_link = models.URLField(null=True, blank=True)
    youtube_link = models.URLField(null=True, blank=True)
    twitter_link = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.name
        
        
class DayPlan(models.Model):
    name = models.CharField(max_length=50, null=True)
    day_number = models.PositiveIntegerField()
    description = models.TextField()
    
    def __str__(self):
        return (self.name)
    
    
class Customers(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='static/Customers/')
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name
    
    
class Review(models.Model):
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE,null=True, blank=True)
    comment = models.TextField()
    rating = models.IntegerField()
    
    
class Booking(models.Model):
    STATUS = [('Booked','Booked'),('Tour Completed','Tour Completed'),('Cancelled','Cancelled')]
    PAYMENT = [('Pending','Pending'),('Completed','Completed'),('Failed','Failed')]
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    travel = models.ForeignKey(Travels, on_delete=models.CASCADE)
    date = models.DateField()
    total_people = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS, default='Booked')
    payment_status = models.CharField(max_length=20, choices=PAYMENT, default='Completed')
    booked_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.customer.name + " - " + self.travel.title + " - " + str(self.date)