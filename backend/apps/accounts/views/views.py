from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from ..models.models import Profile

# ----- LOGIN -----
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email', '').lower().strip()
    password = request.data.get('password', '')
    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    # Try to find user by email (case-insensitive)
    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    user = authenticate(request, username=user.username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


# ----- REGISTER -----
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    email = request.data.get('email', '').lower().strip()
    password = request.data.get('password', '')
    display_name = request.data.get('displayName', '')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email__iexact=email).exists():
        return Response({'error': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate a unique username from email
    username = email.split('@')[0]
    original_username = username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{original_username}{counter}"
        counter += 1

    user = User.objects.create_user(username=username, email=email, password=password)
    # Update display_name in Profile (Profile already created by signal)
    user.accounts_profile.display_name = display_name
    user.accounts_profile.save()

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)


# ----- FORGOT PASSWORD (placeholder) -----
@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_view(request):
    email = request.data.get('email', '')
    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
    # In a real app you'd send an email here.
    # Just return success for now so the UI doesn't break.
    return Response({'message': 'Password reset link sent (simulated).'})


# ----- PROFILE (GET & POST) -----
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    profile = user.accounts_profile
    if request.method == 'GET':
        return Response({
            'displayName': profile.display_name,
            'email': user.email
        })
    elif request.method == 'POST':
        display_name = request.data.get('displayName', profile.display_name)
        email = request.data.get('email', user.email)
        # Update fields
        profile.display_name = display_name
        profile.save()
        if email != user.email:
            # Change email (ensure uniqueness)
            if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                return Response({'error': 'Email already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            user.email = email
            user.save()
        return Response({
            'displayName': profile.display_name,
            'email': user.email
        })