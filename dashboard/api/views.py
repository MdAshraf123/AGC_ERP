from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import StudentSerializer, SubjectSerializer,AttendenceSerializer
from .models import Students,Subject,Attendence
# Create your views here.

class StudentView(generics.ListAPIView):
    serializer_class=StudentSerializer

    def get_queryset(self):
        roll=self.kwargs.get('u_roll')
        queryset=Students.objects.filter(u_roll=roll)
        return queryset

class AttendenceView(generics.ListAPIView):
    serializer_class=AttendenceSerializer

    def get_queryset(self):
        roll=self.kwargs.get('u_roll')
        obj=Students.objects.get(u_roll=roll)
        queryset=Attendence.objects.filter(u_roll=obj)
        
        return queryset
