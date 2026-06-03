from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import os
import json
from django.views.decorators.http import require_http_methods

# Simple in-memory demo user store (NOT persistent). For real apps use DB.
_DEMO_USERS = {}

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
        import json
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


@csrf_exempt
@require_http_methods(["POST"])
def api_login(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
        username = body.get("username")
        password = body.get("password")
        if not username or not password:
            return JsonResponse({"status": "error", "error": "username and password required"}, status=400)

        user = _DEMO_USERS.get(username)
        if not user or user.get("password") != password:
            return JsonResponse({"status": "error", "error": "invalid credentials"}, status=401)

        # Return a mock token and basic profile
        token = f"token-{username}"
        profile = {"username": username, "displayName": user.get("displayName"), "email": user.get("email", "")}
        return JsonResponse({"status": "ok", "token": token, "user": profile})
    except Exception as e:
        return JsonResponse({"status": "error", "error": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def api_register(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
        username = body.get("username")
        password = body.get("password")
        display = body.get("displayName") or username
        email = body.get("email") or ""
        if not username or not password:
            return JsonResponse({"status": "error", "error": "username and password required"}, status=400)
        if username in _DEMO_USERS:
            return JsonResponse({"status": "error", "error": "user exists"}, status=409)

        _DEMO_USERS[username] = {"password": password, "displayName": display, "email": email}
        token = f"token-{username}"
        return JsonResponse({"status": "ok", "token": token, "user": {"username": username, "displayName": display, "email": email}})
    except Exception as e:
        return JsonResponse({"status": "error", "error": str(e)}, status=400)


@csrf_exempt
def api_profile(request):
    # GET returns profile, POST updates profile. Token header: Authorization: Token token-<username>
    try:
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Token "):
            return JsonResponse({"status": "error", "error": "missing token"}, status=401)
        token = auth.split(" ", 1)[1]
        if not token.startswith("token-"):
            return JsonResponse({"status": "error", "error": "invalid token"}, status=401)
        username = token.split("token-", 1)[1]
        user = _DEMO_USERS.get(username)
        if not user:
            return JsonResponse({"status": "error", "error": "user not found"}, status=404)

        if request.method == "GET":
            return JsonResponse({"status": "ok", "user": {"username": username, "displayName": user.get("displayName"), "email": user.get("email", "")}})

        # POST: update
        body = json.loads(request.body.decode("utf-8"))
        display = body.get("displayName")
        email = body.get("email")
        if display is not None:
            user["displayName"] = display
        if email is not None:
            user["email"] = email
        return JsonResponse({"status": "ok", "user": {"username": username, "displayName": user.get("displayName"), "email": user.get("email", "")}})
    except Exception as e:
        return JsonResponse({"status": "error", "error": str(e)}, status=400)
