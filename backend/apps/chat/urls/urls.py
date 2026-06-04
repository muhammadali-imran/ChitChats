from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import views

router = DefaultRouter()
router.register(r"threads", views.ChatThreadViewSet, basename="thread")
router.register(r"messages", views.MessageViewSet, basename="message")

urlpatterns = [
    path("", views.index, name="index"),
    path("receive-encrypted/", views.receive_encrypted, name="receive_encrypted"),
    path("", include(router.urls)),
]
