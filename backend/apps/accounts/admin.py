from django.contrib import admin
from .models.models import Profile

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'display_name', 'created_at']
    search_fields = ['user__username', 'display_name']
    readonly_fields = ['created_at', 'updated_at']
