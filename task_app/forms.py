from dataclasses import fields
from email.policy import default
from urllib import request
from django import forms
from django.contrib.auth.models import User



# Определите ваши выборы для полей status и priority
STATUS_CHOICES = [
    ('новая', 'Новая'),
    ('в процессе', 'В процессе'),
    ('завершена', 'Завершена'),
]

PRIORITY_CHOICES = [
    ('низкий', 'Низкий'),
    ('средний', 'Средний'),
    ('высокий', 'Высокий'),
]

class BaseTaskForm(forms.Form):
    title = forms.CharField(max_length=255, label='Название')
    description = forms.CharField(widget=forms.Textarea, label='Описание')
    status = forms.ChoiceField(choices=STATUS_CHOICES, initial='new', label='Статус')
    priority = forms.ChoiceField(choices=PRIORITY_CHOICES, initial='low', label='Приоритет')
    user = forms.ModelChoiceField(queryset=User.objects.all(), label='Исполнитель')



class CreateTaskForm(BaseTaskForm):
    pass

class EditTaskForm(BaseTaskForm):
    pass