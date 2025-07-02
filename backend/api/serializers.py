from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Department,Section,Semester,Group,Student,Subject,Employee
from django.contrib.auth.models import User

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields=['dId','name']

class SemesterSerializer(serializers.ModelSerializer):
    department=DepartmentSerializer()
    class Meta:
        model=Semester
        fields=['department','sem']

class SectionsSerializer(serializers.ModelSerializer):
    department=DepartmentSerializer()
    class Meta:
        model=Section
        fields=['department','semester','section']

class StudentSerializer(serializers.ModelSerializer):
    department=DepartmentSerializer()
    class Meta:
        model=Student
        fields=['user','department','sections','semester','group','u_roll','c_roll','name','batch','course','father_name','mother_name','dob','address','city','state','country','email','phone','image']

class EmployeeSerializer(serializers.ModelSerializer):
    department= Department()
    class Meta:
        model=Employee
        fields=['department','name','role','joindate','experties','city','state','address','phone','email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)
        token['role']=user.role
        return token