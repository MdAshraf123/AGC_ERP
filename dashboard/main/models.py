from django.db import models

# Create your models here.
class Room(models.Model):
    id=models.AutoField(primary_key=True)
    code=models.IntegerField()
    host=models.CharField(max_length=10)