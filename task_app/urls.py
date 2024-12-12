from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, MainView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', MainView.as_view(), name='main'),
]
