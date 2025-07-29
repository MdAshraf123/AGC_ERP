from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.conf import settings
from datetime import datetime
# Create your models here. 

CHOICSES=[('employee','Employee'),('student','Student'),('faculty','Faculty')] 

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
        return f"({self.department}, {self.sem}th)"

class Section(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name='sections')
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='sections')
    section=models.CharField(max_length=10)
    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['department','semester','section'],name='unique_department_section')
        ]

    def __str__ (self):
        return f"({self.semester} {self.section})"

class Group(models.Model):
    sections=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='groups', default=1)
    group=models.CharField(max_length=5)

    def __str__(self):
        return f"{self.sections}{self.group}"
    
def upload_profile():
    pass
    
class Student(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='students')
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
    sub_id=models.CharField(max_length=10,  null=True)
    name=models.CharField(max_length=20)
    type=models.CharField(max_length=10, null=True, choices=[('lecture','Lecture'),('lab','LAB'),('tute','Tute')])
    class Meta:
        constraints=[ models.UniqueConstraint(fields=['department','semester','sub_id', 'type'],name="unique_dep_sem_sub_id" ), models.UniqueConstraint( fields=['sub_id','type'], name='unique_sub')]

    def __str__(self):
        return f" ({self.semester} {self.sub_id}) "


class Day(models.Model):
    id=models.PositiveIntegerField(primary_key=True)
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
        return f" ({self.emp_id} {self.role}) "

class TeacherAlott(models.Model):
    employees=models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='teacherallot')
    section=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='teacherallot')
    group=models.ForeignKey(Group, on_delete= models.CASCADE, related_name='teacherallot',  null=True, blank=True)
    subject=models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='teacherallot')
    day=models.ForeignKey(Day,on_delete=models.CASCADE, related_name='teacherallot')
    time=models.CharField(max_length=20, validators=[RegexValidator(r'^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)-(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$',"HH:MM AM/PM-HH:MM AM/PM")])
    class Meta: 
        constraints=[
            models.UniqueConstraint(
                fields=['employees','section','subject','group','day'],
                name='unique teacher can teach unique subject each day'
            )
        ]

    def clean(self):
        try:
            start_time_str, end_time_str=self.time.split('-')
            start_time_obj=datetime.strptime(start_time_str.strip(), '%I:%M %p')
            end_time_obj=datetime.strptime(end_time_str.strip(), '%I:%M %p')
            if start_time_obj>= end_time_obj:
                raise ValidationError('Start time must be less than end time')
        except (ValueError,ValidationError) as e:
            print(e)

    def __str__(self):
        return f"{self.employees} {self.subject} "

class Attendence(models.Model):
    employee=models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendence' )
    department=models.ForeignKey(Department, on_delete=models.CASCADE, related_name='attendence' )
    sections=models.ForeignKey(Section,on_delete=models.CASCADE, related_name='attendence')
    group=models.ForeignKey(Group, on_delete=models.CASCADE,related_name='attendence', blank=True, null=True )
    students=models.ForeignKey(Student,on_delete=models.CASCADE, related_name='attendence')
    subject=models.ForeignKey(Subject,on_delete=models.CASCADE, related_name="attendence")
    date=models.DateField(auto_now_add=True)
    is_present=models.BooleanField(default=False)

    @property
    def Python(self):
        appearedcount=self.objects.filter(subject='Python', is_present=True).aggregate(total=models.Count())
        totalcount=self.objects.filter(subject='Python').aggregate(total=models.Count())
        return (appearedcount//totalcount)*100
    
    def __str__(self):
        return f"{self.department} {self.subject} "
    
class AcademicAssignment(models.Model):
    employee=models.ForeignKey(Employee, on_delete=models.CASCADE,related_name='academicassignment')
    department=models.ForeignKey(Department, on_delete=models.CASCADE , related_name='academicassignment')
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='academicassignment')
    section=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='academicassignment')
    subject=models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="academicassignment")
    uploaddate=models.DateField(auto_now_add=True)
    assignmentfile=models.FileField(upload_to='assignments/')

    def __str__(self):
        return f"({self.id})"


class TableHistory(models.Model):
    department=models.ForeignKey(Department, on_delete=models.CASCADE , related_name='tablehistory')
    semester=models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='tablehistory')
    section=models.ForeignKey(Section, on_delete=models.CASCADE, related_name='tablehistory')
    logfile=models.FileField(upload_to='logs/')
