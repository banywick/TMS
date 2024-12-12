from django.db import models
from .forms import STATUS_CHOICES, PRIORITY_CHOICES
from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new',  verbose_name='Статус')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='low', verbose_name='Приоритет')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Исполнитель')
    date_create = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания', blank=True, null=True)

    def __str__(self):
        return self.title
    

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи' 