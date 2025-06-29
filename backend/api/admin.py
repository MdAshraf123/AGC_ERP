from django.contrib import admin
from .models import Student,Semester,Subject,Section,Attendence,Department,Group,User,Employee
# Register your models here.

class AdminStudent(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name=='user':
            kwargs['queryset']=User.objects.filter(role='student')       
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class AdminEmployee(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name=='user':
            kwargs['queryset']=User.objects.filter(role='employee')       
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
admin.site.register(Department) 
admin.site.register(Semester)
admin.site.register(Student,AdminStudent)
admin.site.register(Section)
admin.site.register(Group)
admin.site.register(Subject)
# admin.site.register(TeacherAlott) 
admin.site.register(Attendence)
admin.site.register(User)
admin.site.register(Employee, AdminEmployee) 

