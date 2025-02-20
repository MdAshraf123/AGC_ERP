from django.db import models

# Create your models here.

class Department(models.Model):
    name=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name}"


class Semester(models.Model):
    depart_id=models.ForeignKey(Department, on_delete=models.CASCADE)
    sem=models.PositiveIntegerField()
    class Meta:
        constraints=[
            models.UniqueConstraint( fields=['depart_id','sem'], name='unique_department_sem')
        ]
    
    def __str__(self):
        return f"{self.depart_id}, {self.sem}"

class Group(models.Model):
    group=models.CharField(max_length=5)

    def __str__(self):
        return f"{self.group}"

class Sections(models.Model):
    depart_id=models.ForeignKey(Semester, on_delete=models.CASCADE)
    section=models.CharField(max_length=10)
    group=models.ForeignKey(Group, on_delete=models.CASCADE)
    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['depart_id', 'section'],name='unique_department_section')
        ]

    def __str__ (self):
        return f"{self.depart_id} {self.section} {self.group}"

class Students(models.Model):
    u_roll=models.IntegerField(primary_key=True, blank=False, default=56)
    c_roll=models.IntegerField(unique=True)
    name=models.CharField(max_length=30,blank=False)
    batch=models.CharField(max_length=15,blank=False)
    sem=models.ForeignKey(Semester, on_delete=models.CASCADE, null=True)
    sec=models.CharField(max_length=10, null=True)
    sec_group=models.CharField(max_length=5, null=True)
    course=models.CharField(max_length=15,blank=False) 
    father_name=models.CharField(max_length=30,blank=False)
    mother_name=models.CharField(max_length=30,blank=False)
    dob=models.DateField(blank=False)
    address=models.CharField(max_length=70,blank=False)
    city=models.CharField(max_length=30,blank=False)
    state=models.CharField(max_length=30,blank=False)
    country=models.CharField(max_length=30,blank=False)
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=15,unique=True)
    image=models.URLField()
    password=models.CharField(max_length=10,default='123')

    def __str__(self):
        return f"{self.u_roll} {self.name} {self.course}" #{self.name} {self.batch} {self.course} {self.sem} {self.country} {self.phone} "

    

class Subjects(models.Model):
    depart_sem=models.ForeignKey(Semester, on_delete=models.CASCADE)
    sub_id=models.CharField(max_length=10, unique=True, null=True)
    name=models.CharField(max_length=10)
    type=models.CharField(max_length=10, null=True)

    def __str__(self):
        return f"{self.depart_sem} {self.sub_id}"

class Attendence(models.Model):
    u_roll=models.ForeignKey(Students,on_delete=models.CASCADE)
    subject=models.ForeignKey(Subjects,on_delete=models.CASCADE)
    date=models.DateField(auto_now_add=True)
    is_present=models.CharField(max_length=2)

    def __str__(self):
        return f"{self.u_roll} {self.subject} "

class Day(models.Model):
    day=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.day}"

class Employees(models.Model):
    emp_id=models.IntegerField(primary_key=True)
    name=models.CharField(max_length=30)
    role=models.CharField(max_length=20)
    department=models.CharField(max_length=40)
    city=models.CharField(max_length=30)
    state=models.CharField(max_length=30)
    address=models.CharField(max_length=50)
    contact=models.CharField(max_length=15)
    email=models.EmailField()
    image=models.URLField()
    password=models.CharField(max_length=10)

    def __str__(self):
        return f"{self.emp_id} {self.role} "

class TeacherAlott(models.Model):
    emp_id=models.ForeignKey(Employees, on_delete=models.CASCADE, null=True)
    sec=models.ForeignKey(Sections, on_delete=models.CASCADE ,default='1')
    subject=models.ForeignKey(Subjects, on_delete=models.CASCADE)
    day=models.ForeignKey(Day,on_delete=models.CASCADE)
    # class Meta:
    #     constraints=[
    #         models.CheckConstraint(
    #             check=models.Q(emp_id__role='teacher'),
    #             name='check_teacher_role'
    #         )
    #     ]

    def __str__(self):
        return f"{self.emp_id} {self.subject} "

