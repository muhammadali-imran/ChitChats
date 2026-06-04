from django.urls import path

from ..views import views

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/forgot-password/', views.forgot_password_view, name='forgot-password'),
    path('profile/', views.profile_view, name='profile'),
]