from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.conf import settings
# Create your models here. 

CHOICSES=[('employee','Employee'),('student','Student')]

class User(AbstractUser):
    role=models.CharField(max_length=15, choices=CHOICSES )

class Department(models.Model):
    dId=models.IntegerField(unique=True, null=False)
    name=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name}"


class Semester(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE,related_name='semesters')
    sem=models.PositiveIntegerField()
    class Meta:
        constraints=[
            models.UniqueConstraint( fields=['department','sem'], name='unique_department_sem')
        ]
    
    def __str__(self):
        return f"{self.department}, {self.sem}"

class Section(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name='sections')
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='sections')
    section=models.CharField(max_length=10)
    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['department','semester','section'],name='unique_department_section')
        ]

    def __str__ (self):
        return f"{self.department} {self.semester} {self.section} "

class Group(models.Model):
    sections=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='groups', default=1)
    group=models.CharField(max_length=5)

    def __str__(self):
        return f"{self.sections}{self.group}"
    
def upload_profile():
    pass
    
class Student(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='students')
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name='students')
    sections=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='students')
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='students')
    group=models.ForeignKey(Group,on_delete=models.CASCADE, related_name='students', default='1')
    u_roll=models.IntegerField(unique=True, null=True, blank=True)
    c_roll=models.IntegerField(unique=True, null=False,blank=False, validators=[RegexValidator(r"[A-Za-z0-9]", "Enter c_roll (only alphanumeric is alowed)")])
    name=models.CharField(max_length=35,blank=False)
    batch=models.CharField(max_length=20,blank=False)
    course=models.CharField(max_length=15,blank=False) 
    father_name=models.CharField(max_length=30,blank=False)
    mother_name=models.CharField(max_length=30,blank=False)
    dob=models.DateField(blank=False)
    address=models.CharField(max_length=70,blank=False)
    city=models.CharField(max_length=30,blank=False)
    state=models.CharField(max_length=30,blank=False)
    country=models.CharField(max_length=30,blank=False)
    email=models.EmailField(unique=True, validators=[RegexValidator(r'^[a-zA-Z0-9._+-]+@gmail\.com$',"Enter gmail (@gmail.com)")])
    phone=models.CharField(max_length=15,unique=True, validators=[RegexValidator(r"^\d{10}$", "Enter only 10 digits number." )])
    father_phone=models.CharField(max_length=15, validators=[RegexValidator(r"^\d{10}$", "Enter only 10 digits number-")])
    image=models.ImageField(upload_to=upload_profile, default='null')


    def __str__(self):
        return f"{self.u_roll} {self.name} {self.course}" #{self.name} {self.batch} {self.course} {self.sem} {self.country} {self.phone} "

    

class Subject(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name="subjects")
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name="subjects")
    sub_id=models.CharField(max_length=10, unique=True, null=True)
    name=models.CharField(max_length=10)
    type=models.CharField(max_length=10, null=True)
    class Meta:
        constraints=[ models.UniqueConstraint(fields=['department','semester','sub_id'],name="unique_dep_sem_sub_id" )]

    def __str__(self):
        return f"{self.semester} {self.sub_id}"

class Attendence(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name='attendences' )
    sections=models.ForeignKey(Section,on_delete=models.CASCADE, related_name='attendences')
    group=models.ForeignKey(Group, on_delete=models.CASCADE,related_name='attendences' )
    students=models.ForeignKey(Student,on_delete=models.CASCADE, related_name='attendences')
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE, related_name="attendences")
    date=models.DateField(auto_now_add=True)
    is_present=models.CharField(max_length=2)

    def __str__(self):
        return f"{self.department} {self.subject} "

class Day(models.Model):
    day=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.day}"

class Employee(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="employees")
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name="employees")
    emp_id=models.IntegerField(primary_key=True)
    name=models.CharField(max_length=30)
    role=models.CharField(max_length=20)
    joindate=models.DateField()
    experties=models.CharField(max_length=25)
    city=models.CharField(max_length=30)
    state=models.CharField(max_length=30)
    address=models.CharField(max_length=50)
    phone=models.CharField(max_length=15)
    email=models.EmailField()
    image=models.ImageField(upload_to=upload_profile, default='null')

    def __str__(self):
        return f"{self.emp_id} {self.role} "

# class TeacherAlott(models.Model):
#     employees=models.ForeignKey(Employees, on_delete=models.CASCADE)
#     section=models.ForeignKey(Sections, on_delete=models.CASCADE )
#     subject=models.ForeignKey(Subjects, on_delete=models.CASCADE)
#     day=models.ForeignKey(Day,on_delete=models.CASCADE)
#     # class Meta:
#     #     constraints=[
#     #         models.CheckConstraint(
#     #             check=models.Q(emp_id__role='teacher'),
#     #             name='check_teacher_role'
#     #         )
#     #     ]

#     def __str__(self):
#         return f"{self.emp_id} {self.subject} "

