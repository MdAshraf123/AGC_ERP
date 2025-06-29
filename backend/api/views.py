from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import DepartmentSerializer,SectionsSerializer,MyTokenObtainPairSerializer,SemesterSerializer,StudentSerializer
from api.models import Department,Section,Student,Semester
from django.shortcuts import get_object_or_404
# Create your views here.

# class DepartmentDetails(ModelViewSet):
#     queryset=Department.objects.all()
#     serializer_class=DepartmentSerializer
#     lookup_field='dId'

# class SectionDetails(ModelViewSet):
#     queryset=Sections.objects.all()
#     serializer_class=SectionsSerializer
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user,'students') 
    
class IsEmployees(BasePermission):
    def has_permission(self,request, view):
        return request.user.is_authenticated and hasattr(request.user, 'employeess')
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStudent])
def department(request):
    dept=Department.objects.all()
    serializer=DepartmentSerializer(dept, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStudent])
def sections(request):
    sect= Section.objects.all()
    serializer=SectionsSerializer(sect, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStudent])
def semester(request):
    sect= Semester.objects.all()
    serializer=SemesterSerializer(sect, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStudent])
def student_profile(request):
    print(request.headers)
    student_data=request.user.students
    serialized=StudentSerializer(student_data)
    return Response(serialized.data)