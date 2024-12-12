from django.urls import path, reverse_lazy
from .views import SignUpView, LoginView, logout_view
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView

app_name = 'user_auth'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('logout/', logout_view, name='logout'),

    path('password_reset/', PasswordResetView.as_view(
        template_name='register/password_reset.html',
        email_template_name='register/password_reset_email.html',
        success_url=reverse_lazy('user_auth:password_reset_done')
    ), name='password_reset'),

    path('password_reset/done/', PasswordResetDoneView.as_view(
        template_name='register/password_reset_done.html'
    ), name='password_reset_done'),

    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(
        template_name='register/password_reset_confirm.html',
        success_url=reverse_lazy('user_auth:password_reset_complete')
    ), name='password_reset_confirm'),

    path('reset/done/', PasswordResetCompleteView.as_view(
        template_name='register/password_reset_complete.html'
    ), name='password_reset_complete'),]

