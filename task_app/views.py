from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .forms import CreateTaskForm, EditTaskForm
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['get'])
    def get_task_with_users(self, request, pk=None):
        task = self.get_object()
        users = User.objects.all()
        task_serializer = TaskSerializer(task)
        users_serializer = UserSerializer(users, many=True)

        return Response({
            'task': task_serializer.data,
            'users': users_serializer.data
        })


class MainView(TemplateView):
    template_name = 'task_app/index.html'  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = CreateTaskForm()
        context['edit_form'] = EditTaskForm()
        return context      
    



