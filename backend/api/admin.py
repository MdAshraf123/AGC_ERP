from django.contrib import admin
from .models import Students,Semester,Subjects,Sections,Attendence,Department,Group

# Register your models here.

# class AdminStudents(admin.ModelAdmin):
#     class Meta:
#         field
admin.site.register(Department)
admin.site.register(Semester)
admin.site.register(Students)
admin.site.register(Sections)

admin.site.register(Group)
admin.site.register(Subjects)
# admin.site.register(TeacherAlott)
admin.site.register(Attendence)

