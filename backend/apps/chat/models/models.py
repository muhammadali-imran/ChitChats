from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class ChatThread(models.Model):
    TYPE_CHOICES = [("chat", "Chat"), ("community", "Community")]
    
    id = models.CharField(max_length=36, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    thread_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="chat")
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="threads_created")
    members = models.ManyToManyField(User, related_name="threads")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.title} ({self.thread_type})"


class Message(models.Model):
    id = models.CharField(max_length=36, primary_key=True)
    thread = models.ForeignKey(ChatThread, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="messages")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Message from {self.sender.username} in {self.thread.title}"
