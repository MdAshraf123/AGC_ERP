from django.urls import path
from .views import RoomView
from main import views
urlpatterns=[
    path('main/',views.getRoutes, name='getRoutes'),
    path('',RoomView.as_view()),
]