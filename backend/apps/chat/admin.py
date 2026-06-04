from django.contrib import admin
from .models.models import ChatThread, Message

@admin.register(ChatThread)
class ChatThreadAdmin(admin.ModelAdmin):
    list_display = ['title', 'thread_type', 'creator', 'created_at']
    search_fields = ['title', 'description']
    list_filter = ['thread_type', 'created_at']
    filter_horizontal = ['members']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['thread', 'sender', 'created_at']
    search_fields = ['content', 'thread__title']
    list_filter = ['created_at', 'thread']
    readonly_fields = ['created_at', 'updated_at']
