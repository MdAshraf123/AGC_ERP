from django.db import models

# Create your models here.
class Students(models.Model):
    u_roll=models.IntegerField(unique=True, blank=False)
    c_roll=models.IntegerField(unique=True)
    name=models.CharField(max_length=30,blank=False)
    batch=models.CharField(max_length=15,blank=False)
    sem=models.PositiveIntegerField(blank=False)
    course=models.CharField(max_length=15,blank=False) 
    father_name=models.CharField(max_length=30,blank=False)
    mother_name=models.CharField(max_length=30,blank=False)
    dob=models.DateField(blank=False)
    address=models.CharField(max_length=70,blank=False)
    city=models.CharField(max_length=30,blank=False)
    state=models.CharField(max_length=30,blank=False)
    country=models.CharField(max_length=30,blank=False)
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=15,unique=True)
    image=models.URLField()

    def __str__(self):
        return f"{self.u_roll}" #{self.name} {self.batch} {self.course} {self.sem} {self.country} {self.phone} "

class Subject(models.Model):
    subject_id=models.CharField(max_length=10,unique=True,blank=False)
    subject=models.CharField(max_length=30,)
    sem=models.PositiveIntegerField()

    def __str__(self):
        return f'{self.subject}'
    
class Attendence(models.Model):
    u_roll=models.ForeignKey(Students,on_delete=models.CASCADE)
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE)
    date=models.DateField(auto_now_add=True)
    is_present=models.BooleanField(default=True)
