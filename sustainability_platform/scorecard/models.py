from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=120)
    packaging_material = models.CharField(max_length=120)
    shelf_life_days = models.PositiveBigIntegerField()
    transport_distance_km = models.FloatField()
    transport_mode = models.CharField(max_length=15)
    supplier_certifications = models.JSONField(default=list, blank=True) 
    origin_country = models.CharField(max_length=60)
    total_score = models.PositiveBigIntegerField(null = True , blank= True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
      return self.name