from rest_framework import serializers
from .models import Students, Subject,Attendence

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Students
        fields=('u_roll','c_roll','name','batch','sem','course','father_name','mother_name','dob','address','city','state','country','email','phone','image')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Subject
        fields=('subject_id','subject','sem')

class AttendenceSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()
    class Meta:
        model=Attendence
        fields=('u_roll','subject','date','is_present')