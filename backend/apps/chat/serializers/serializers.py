from rest_framework import serializers
from django.contrib.auth.models import User
from ..models.models import ChatThread, Message


class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source="accounts_profile.display_name", read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "display_name"]


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source="sender.username", read_only=True)
    sender_display_name = serializers.CharField(
        source="sender.accounts_profile.display_name", read_only=True
    )

    class Meta:
        model = Message
        fields = ["id", "thread", "sender", "sender_username", "sender_display_name", "content", "created_at"]
        read_only_fields = ["created_at", "sender"]


class ChatThreadSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(source="creator.username", read_only=True)
    member_count = serializers.SerializerMethodField()
    messages_count = serializers.SerializerMethodField()

    class Meta:
        model = ChatThread
        fields = [
            "id",
            "title",
            "description",
            "thread_type",
            "creator",
            "creator_username",
            "member_count",
            "messages_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["creator", "created_at", "updated_at"]

    def get_member_count(self, obj):
        return obj.members.count()

    def get_messages_count(self, obj):
        return obj.messages.count()


class ChatThreadDetailSerializer(ChatThreadSerializer):
    members = UserSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta(ChatThreadSerializer.Meta):
        fields = ChatThreadSerializer.Meta.fields + ["members", "messages"]
