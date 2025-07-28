from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Department,Section,Semester,Group,Student,Subject,Employee,TeacherAlott,Attendence
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

class SectionSerializer(serializers.ModelSerializer):
    # department=DepartmentSerializer()
    semester=SemesterSerializer()
    class Meta:
        model=Section
        fields=['department','semester','section']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields=['group']

class StudentSerializer(serializers.ModelSerializer):
    department=DepartmentSerializer()
    group=GroupSerializer()
    sections=SectionSerializer()
    class Meta:
        model=Student
        fields=['user','department','sections','semester','group','u_roll','c_roll','name','batch','course','father_name','mother_name','dob','address','city','state','country','email','phone','image']

class AttendanceStudentSerializer(serializers.ModelSerializer):
    department=DepartmentSerializer()
    group=GroupSerializer()
    sections=SectionSerializer()
    class Meta:
        model=Student
        fields=['user','department','sections','semester','group','u_roll','c_roll','name','batch','course','father_name','mother_name','city','state','country','email','phone',]

    def to_representation(self, instance):
        student_data=super().to_representation(instance)
        return {
            'is_present':'A',
            'date':None,
            'student':student_data,
        }
        
class EmployeeSerializer(serializers.ModelSerializer):
    department= DepartmentSerializer()
    class Meta:
        model=Employee
        fields=['department','name','role','joindate','experties','city','state','address','phone','email']


class TeacherAlottSerializer(serializers.ModelSerializer):
    section=SectionSerializer() 
    group=GroupSerializer()
    class Meta:
        model=TeacherAlott
        fields=['section','group','subject','day','time']

class PresentAbsentField(serializers.BooleanField):
    def to_internal_value(self, data):
        if data=='P':
            return True
        elif data=='A':
            return False
        else:
            raise serializers.ValidationError('Use P for present of A for absent.')
        
    def to_representation(self, value):
        return 'P' if value else 'A'
    

class BulkUpdateListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        # Map each instance by its ID
        instance_mapping = {instance.id: instance for instance in instances}
        updated_instances = []

        for data in validated_data:
            instance = instance_mapping.get(data['id'])
            if instance:
                updated_instance = self.child.update(instance, data)
                updated_instances.append(updated_instance)
        return updated_instances

    
class AttendenceSerializer(serializers.ModelSerializer):
    student=StudentSerializer(source='students', read_only=True)

    students=serializers.SlugRelatedField(
        queryset=Student.objects.all(),
        slug_field='c_roll',
        write_only=True
    )

    date=serializers.DateField(read_only=True)

    is_present=PresentAbsentField()
    id = serializers.IntegerField()  #Make id writable
    class Meta:
        model=Attendence 
        fields=['id','student','students','date','is_present'] 
        list_serializer_class = BulkUpdateListSerializer 


class AttendenceCreateSerializer(serializers.ModelSerializer):
    student=StudentSerializer(source='students', read_only=True)

    students=serializers.SlugRelatedField(
        queryset=Student.objects.all(),
        slug_field='c_roll',
        write_only=True
    )

    date=serializers.DateField(read_only=True)

    is_present=PresentAbsentField()

    class Meta:
        model=Attendence 
        fields=['student','students','date','is_present'] 




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)
        token['role']=user.role
        return token
    


    
