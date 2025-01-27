from django.http import JsonResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer

def getRoutes(request):
    return JsonResponse("Hello Ashraf", safe=False)