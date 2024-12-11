from urllib import request
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .forms import CreateTaskForm, EditTaskForm
from .models import Task
from .serializers import TaskSerializer
from django.views.generic import TemplateView

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MainView(TemplateView):
    template_name = 'task_app/index.html'  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = CreateTaskForm()
        context['edit_form'] = EditTaskForm()
        return context      


