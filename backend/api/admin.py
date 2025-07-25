from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Student,Semester,Subject,Section,Attendence,Department,Group,User,Employee,Day,TeacherAlott
# Register your models here.

class AdminStudent(admin.ModelAdmin):
    list_display=['user','u_roll','c_roll','name','department','semester','sections','group','batch']
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name=='user':
            kwargs['queryset']=User.objects.filter(role='student')       
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class AdminEmployee(admin.ModelAdmin):
    list_display=['user','department','emp_id','name','role']
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name=='user':
            kwargs['queryset']=User.objects.filter(role='faculty')       
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    

class AdminAttendance(admin.ModelAdmin):
    list_display=['id','employee','students','department','subject','date','is_present']

class AdminSubject(admin.ModelAdmin):
    list_display=['sub_id','department','semester','name','type']

class AdminTeacherAlott(admin.ModelAdmin):
    list_display=['employees','section','group','subject','day','time']


admin.site.register(Department) 
admin.site.register(Semester)
admin.site.register(Student,AdminStudent)
admin.site.register(Section)
admin.site.register(Group)
admin.site.register(Subject, AdminSubject) 
admin.site.register(Attendence,AdminAttendance)
admin.site.register(TeacherAlott,AdminTeacherAlott) 
admin.site.register(Employee, AdminEmployee) 

class DayAdmin(admin.ModelAdmin):
    list_display=['id','day']
admin.site.register(Day, DayAdmin)

class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (
        ('Role Info', {'fields': ('role',)}),
    )

admin.site.register(User, CustomUserAdmin)
