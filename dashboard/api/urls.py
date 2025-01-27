from django.urls import path
from .views import StudentView,AttendenceView
urlpatterns=[
    path('students/<int:u_roll>/',StudentView.as_view()),
    path('attendence/<int:u_roll>/',AttendenceView.as_view()),
]