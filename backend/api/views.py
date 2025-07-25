from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import DepartmentSerializer,SectionSerializer,MyTokenObtainPairSerializer,SemesterSerializer,StudentSerializer,EmployeeSerializer,TeacherAlottSerializer,AttendenceSerializer,AttendanceStudentSerializer,AttendenceCreateSerializer
from api.models import Department,Section,Student,Semester,TeacherAlott,Attendence,Group,Subject
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime
import re
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

@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated, IsEmployee])
def students_marking(request): 
    if request.method=='GET':
        if not all(request.query_params.get(key) for key in request.query_params if key != 'group'):
            return Response({'error':'all required params must have value'}, status=400)
        if Attendence.objects.filter(date=datetime.today(), employee=request.user.employees, department__dId=request.query_params.get('dept'), sections__semester__sem= request.query_params.get('sem'),  sections__section=request.query_params.get('sec')).exists():
            attendnc=Attendence.objects.filter(date=datetime.today(), employee=request.user.employees, department__dId=request.query_params.get('dept'), sections__semester__sem= request.query_params.get('sem'), sections__section=request.query_params.get('sec'))
            serializer=AttendenceSerializer(attendnc, many=True)
            print(serializer.data)
            return Response(serializer.data)
        elif request.query_params.get('group') != 'Full':
            filtered_student= Student.objects.filter(department__dId=request.query_params.get('dept'), semester__sem=request.query_params.get('sem'), group__group=request.query_params.get('group'), sections__section= request.query_params.get('sec'))
        else:
            filtered_student= Student.objects.filter(department__dId=request.query_params.get('dept'), semester__sem=request.query_params.get('sem'), sections__section= request.query_params.get('sec'))
        serializer=AttendanceStudentSerializer(filtered_student, many=True)
        return Response(serializer.data)
    
    elif request.method=='PUT':
        # print(request.data)
        # id=request.data['id']
        departmnt= Department.objects.get(dId=request.data['dept'])
        sem=Semester.objects.get(department=departmnt, sem=int(request.data['sem']))
        sec=Section.objects.get(department=departmnt, semester=sem, section=request.data['sec'])
        group=None
        if request.data['group'] != 'Full': 
            group= Group.objects.get(sections=sec, group=request.data['group'])
        sub=Subject.objects.get(id=request.data['subject'])
        students=request.data['students']
        update_instance=[]
        update_data=[]
        create_data=[]
        for stu in students:
            if 'id' in stu and stu['id']:
                try:
                    stu_record=Attendence.objects.get(id=stu['id'])
                    update_instance.append(stu_record)
                    update_data.append(stu)

                except Attendence.DoesNotExist:
                    create_data.append(stu)

            else:
                create_data.append(stu)

        if update_data:
            serializer=AttendenceSerializer(update_instance, data=students, many=True)
            if serializer.is_valid():
                serializer.save(
                    employee=request.user.employees,
                    department=departmnt,
                    group=group,
                    sections=sec,
                    subject=sub
                )
                return JsonResponse({'message':'Attendance updated successfully!'}, status=200)
            else:
                print('@line no 128: ',serializer.errors)

        if create_data:
            serializer=AttendenceCreateSerializer(data=students, many=True)
            print(serializer.initial_data)
            if serializer.is_valid():
                attendance=serializer.save(
                    employee=request.user.employees,
                    department=departmnt,
                    group=group,
                    sections=sec,
                    subject=sub
                )
                return JsonResponse({'message':'Attendance marked successfully!'}, status=200)
            else:
                print('@line no 142: ',serializer.errors)
    return JsonResponse({'message':'something wrong'}, status=400)
        # attendnc=Attendence.objects.filter(date=datetime.today(), employee=request.user.employees, department__dId=request.query_params.get('dept'), sections__semester__sem= request.query_params.get('sem'), sections__section=request.query_params.get('sec'))
        # Attendence.objects.


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployee])
def teacher_allot(request):
    allotment= TeacherAlott.objects.filter( employees= request.user.employees, day=datetime.now().isoweekday())
    serializer=TeacherAlottSerializer(allotment, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def resetpassword(request):
    regex='(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).*(?=.*[@*=+&^%$#!_-]).*'
    user=request.user
    if not re.fullmatch(regex,request.data['newPassword']):
        if user.check_password(request.data['oldPassword']):
            user.password=make_password(request.data['newPassword'])
            user.save()
            return JsonResponse({'message':'Successfully changed!',}, status=200)
        else:
            return JsonResponse({'message':'Unauthorized user!',}, status=401)
    else:
        return JsonResponse({'message':'New password is in wrong format!',}, status=200)
    