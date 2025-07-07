from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/departments/',views.department),
    path('api/semester/', views.semester),
    path('api/sections/',views.sections), 
    path('api/student_profile/',views.student_profile),
    path('api/employee/', views.employee_detail),
    path('api/allotment/',views.teacher_allot),
    path('api/students/', views.students_marking),
]

# router=DefaultRouter()
# router.register('departments',views.DepartmentDetails)
# router.register('sections',views.SectionDetails)
# urlpatterns=router.urls

# urlpatterns=[
#     path('departments/',views.department),
#     path('sections/',views.sections), 
# ]