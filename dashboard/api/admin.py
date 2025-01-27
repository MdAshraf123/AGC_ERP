from django.contrib import admin
from .models import Students,Attendence,Subject
# Register your models here.

@admin.register(Students)
class StudentAdmin(admin.ModelAdmin):
    list_display=['id','u_roll','c_roll','name','batch','sem','course','father_name','mother_name','dob','address','city','state','country']


class AttendenceAdmin(admin.ModelAdmin):
    list_display=['id','u_roll','subject','date','is_present']

admin.site.register(Attendence,AttendenceAdmin)

class SubjectAdmin(admin.ModelAdmin):
    list_display=['subject_id','subject','sem']
admin.site.register(Subject, SubjectAdmin)