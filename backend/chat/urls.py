from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/send/", views.receive_encrypted, name="receive_encrypted"),
    # Auth & profile (demo/stubbed endpoints)
    path("api/auth/login/", views.api_login, name="api_login"),
    path("api/auth/register/", views.api_register, name="api_register"),
    path("api/profile/", views.api_profile, name="api_profile"),
]
