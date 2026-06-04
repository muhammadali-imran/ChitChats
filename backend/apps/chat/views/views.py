from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
import base64
import json
import os
import uuid
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

from ..models.models import ChatThread, Message
from ..serializers.serializers import (
    ChatThreadSerializer,
    ChatThreadDetailSerializer,
    MessageSerializer,
    UserSerializer,
)

# WARNING: Insecure to store key in code for production.
# Use environment variable or user-specific keys.
AES_KEY = os.environ.get("AES_KEY", "ThisIsASecretKey").encode("utf-8")  # 16/24/32 bytes

def index(request):
    # Render page with client encryption UI
    return render(request, "index.html", {"aes_key_hint": "16-char secret (for demo). Do not hardcode in prod."})

@csrf_exempt
def receive_encrypted(request):
    # POST JSON: { "payload": "<base64 iv+ciphertext>" }
    if request.method != "POST":
        return HttpResponseBadRequest("POST required")

    try:
        body = json.loads(request.body.decode("utf-8"))
        payload_b64 = body.get("payload")
        if not payload_b64:
            return HttpResponseBadRequest("payload missing")

        raw = base64.b64decode(payload_b64)
        if len(raw) < AES.block_size:
            return HttpResponseBadRequest("invalid payload")

        iv = raw[:AES.block_size]
        ciphertext = raw[AES.block_size:]

        cipher = AES.new(AES_KEY, AES.MODE_CBC, iv)
        decrypted = unpad(cipher.decrypt(ciphertext), AES.block_size)
        text = decrypted.decode("utf-8")

        # For demo, return plaintext. In a real app store or process it securely.
        return JsonResponse({"status": "ok", "plaintext": text})
    except Exception as e:
        return JsonResponse({"status": "error", "error": str(e)}, status=400)



# DRF ViewSets for CRUD
class ChatThreadViewSet(viewsets.ModelViewSet):
    """CRUD operations for chat and community threads."""
    serializer_class = ChatThreadSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        return ChatThread.objects.filter(members=self.request.user)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ChatThreadDetailSerializer
        return ChatThreadSerializer

    def perform_create(self, serializer):
        thread = serializer.save(creator=self.request.user)
        thread.members.add(self.request.user)

    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):
        thread = self.get_object()
        username = request.data.get("username")
        if not username:
            return Response({"error": "username required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
            thread.members.add(user)
            return Response({"status": "ok", "message": "Member added"})
        except User.DoesNotExist:
            return Response({"error": "user not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=["post"])
    def remove_member(self, request, pk=None):
        thread = self.get_object()
        username = request.data.get("username")
        if not username:
            return Response({"error": "username required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
            thread.members.remove(user)
            return Response({"status": "ok", "message": "Member removed"})
        except User.DoesNotExist:
            return Response({"error": "user not found"}, status=status.HTTP_404_NOT_FOUND)


class MessageViewSet(viewsets.ModelViewSet):
    """CRUD operations for messages."""
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        thread_id = self.request.query_params.get("thread_id")
        if thread_id:
            return Message.objects.filter(thread_id=thread_id)
        return Message.objects.all()

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user, id=str(uuid.uuid4()))

    def list(self, request, *args, **kwargs):
        thread_id = request.query_params.get("thread_id")
        if not thread_id:
            return Response({"error": "thread_id query parameter required"}, status=status.HTTP_400_BAD_REQUEST)
        return super().list(request, *args, **kwargs)
