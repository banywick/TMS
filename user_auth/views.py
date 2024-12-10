# views.py
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm


class SignUpView(FormView):
    template_name = 'user_auth/signup.html'
    form_class = SignUpForm
    success_url = reverse_lazy('main')

    def form_valid(self, form):
        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)
        login(self.request, user)
        return super().form_valid(form)

class LoginView(FormView):
    template_name = 'user_auth/login.html'
    form_class = AuthenticationForm
    success_url = reverse_lazy('main')

    def form_valid(self, form):
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(self.request, user)
        return super().form_valid(form)
    

