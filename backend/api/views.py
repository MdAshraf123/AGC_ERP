from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import DepartmentSerializer,SectionSerializer,MyTokenObtainPairSerializer,SemesterSerializer,StudentSerializer,EmployeeSerializer,TeacherAlottSerializer
from api.models import Department,Section,Student,Semester,TeacherAlott
from django.shortcuts import get_object_or_404
from datetime import datetime
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
    
class IsEmployee(BasePermission):
    def has_permission(self,request, view):
        return request.user.is_authenticated and hasattr(request.user, 'employees')
    
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
    serializer=SectionSerializer(sect, many=True)
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
    student_data=request.user.students
    serialized=StudentSerializer(student_data)
    return Response(serialized.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployee])
def employee_detail(request):
    employee_data=request.user.employees
    serialized=EmployeeSerializer(employee_data)
    return Response(serialized.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployee])
def students_marking(request): 
    if not all(request.query_params.get(key) for key in request.query_params if key != 'group'):
        return Response({'error':'all required params should have value'}, status=400)
    if request.query_params.get('group') != 'Full':
        filtered_student= Student.objects.filter(department__dId=request.query_params.get('dept'), semester__sem=request.query_params.get('sem'), group__group=request.query_params.get('group'), sections__section= request.query_params.get('sec'))
    else:
        filtered_student= Student.objects.filter(department__dId=request.query_params.get('dept'), semester__sem=request.query_params.get('sem'), sections__section= request.query_params.get('sec'))
    serializer=StudentSerializer(filtered_student, many=True)
    print('ashraf- ',request.query_params.get('dept'))
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployee])
def teacher_allot(request):
    allotment= TeacherAlott.objects.filter( employees= request.user.employees, day=datetime.now().isoweekday())
    serializer=TeacherAlottSerializer(allotment, many=True)
    return Response(serializer.data)