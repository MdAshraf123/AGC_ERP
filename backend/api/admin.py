from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Student,Semester,Subject,Section,Attendence,Department,Group,User,Employee,Day,TeacherAlott
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
    

class AdminAttendance(admin.ModelAdmin):
    list_display=['id','employee','students','department','subject','date','is_present']

admin.site.register(Department) 
admin.site.register(Semester)
admin.site.register(Student,AdminStudent)
admin.site.register(Section)
admin.site.register(Group)
admin.site.register(Subject) 
admin.site.register(Attendence,AdminAttendance)
admin.site.register(TeacherAlott) 
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
