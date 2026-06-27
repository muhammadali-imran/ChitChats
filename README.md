

## Overview

This document provides a comprehensive overview of the **ChitChats** project – a full‑stack chat application built with a **Django** backend and a **React** (Vite) frontend.  The goal is to give newcomers a clear mental model of how the pieces fit together, explain data flow, and describe the design decisions that guided the current implementation.

---

## Table of Contents

1. [Project Layout](#project-layout)
2. [Backend Architecture](#backend-architecture)
   - Apps & Core Components
   - Authentication & Profile Management
   - Chat Messaging Flow
   - API Versioning & Routing
3. [Frontend Architecture](#frontend-architecture)
   - Folder Structure
   - State Management (AuthProvider)
   - UI Flow
4. [Data Flow Diagram](#data-flow-diagram)
5. [Security & Encryption](#security--encryption)
6. [Deployment & Development Workflow](#deployment--development-workflow)
7. [Glossary of Key Terms](#glossary-of-key-terms)

---

## Project Layout

```
ChitChats/
├─ backend/                # Django project
│  ├─ apps/                # Individual Django apps (accounts, chat, etc.)
│  ├─ config/              # Settings, URLs, and DRF configuration
│  ├─ db.sqlite3           # Development SQLite DB (replace in prod)
│  └─ manage.py            # Django management CLI
├─ frontend/               # React (Vite) SPA
│  ├─ public/              # Static assets (favicon, index.html)
│  ├─ src/                 # Source code
│  │  ├─ app/              # Root component and routing
│  │  ├─ features/         # Feature‑gated domains (auth, chat, …)
│  │  │  ├─ auth/          # Authentication UI & hooks
│  │  │  └─ chat/          # Chat UI components
│  │  └─ index.jsx         # Entry point
│  └─ vite.config.ts       # Vite configuration
├─ .gitignore
├─ LICENSE
└─ README.md               # High‑level project description
```

---

## Backend Architecture

### Apps & Core Components

| App | Purpose | Key Models | Notable Views / Serializers |
|-----|---------|------------|------------------------------|
| **accounts** | User authentication, registration, profile data (display name, avatar, bio). | `User` (Django auth) – `Profile` (one‑to‑one with `User`). | `LoginView`, `RegisterView`, `ForgotPasswordView`, `ProfileView` (all in `accounts.views`). |
| **chat** | Real‑time messaging, chat‑specific metadata (is_online, last_seen). | `Message`, `Conversation`, (optional) `UserProfile` – **removed** – now uses `accounts.Profile` for display data. | `MessageViewSet`, `ConversationViewSet` (API endpoints under `/api/chat/`). |
| **config** | Global Django settings, DRF config, URL routing. | – | `settings.py`, `urls.py` (includes `accounts` under `/api/` and `chat` under `/api/chat/`). |

### Authentication & Profile Management

1. **Login** – `POST /api/login/` → validates credentials, returns JWT access token.
2. **Register** – `POST /api/register/` → creates `User` + `Profile`, returns token.
3. **Forgot Password** – `POST /api/forgot-password/` (email‑based reset flow).
4. **Profile** – `GET/PUT /api/profile/` – requires authentication; reads/writes the `accounts.Profile` instance linked via `request.user`.

All endpoints live in the **accounts** app.  The previous duplication in `chat.UserProfile` was removed; any chat‑related UI now consumes `accounts.Profile` via the ``accounts_profile`` reverse accessor.

### Chat Messaging Flow

- **Message creation** – Authenticated `POST /api/chat/messages/` creates a `Message` linked to a `Conversation`.
- **Conversation listing** – `GET /api/chat/conversations/` returns recent conversations for the logged‑in user.
- **Real‑time** – (Future) could be extended with Django Channels; currently a classic request/response API.

### API Versioning & Routing

- Root API namespace: `/api/` → **accounts** routes.
- Chat‑specific namespace: `/api/chat/` → **chat** routes.
- This separation avoids endpoint collisions and makes Swagger documentation cleaner.

---

## Frontend Architecture

### Folder Structure (selected view)

```
src/
├─ app/                     # Top‑level layout & router
│  └─ App.jsx               # Includes <BrowserRouter> and global providers
├─ features/
│  ├─ auth/
│  │  ├─ components/        # AuthPage.jsx, LoginForm.jsx, etc.
│  │  ├─ hooks/             # useAuth.jsx – central auth state & handlers
│  │  └─ utils/             # authHandlers.js (API wrappers), api.js
│  └─ chat/
│     └─ ...               # Chat UI components
└─ index.jsx                # React entry point
```

### State Management (AuthProvider)

- **Token** is stored in `localStorage` and synchronized to React state.
- **User** profile is fetched via `fetchProfile` inside a `useEffect` that watches the token.
- Handlers (`handleLogin`, `handleSignup`, `handleForgotPassword`) are **memoized with `useMemo`** to avoid stale‑closure bugs; they always receive the latest form data.
- The profile fetch is **centralized** – the UI components simply consume `user` from context.

### UI Flow

1. **AuthPage** – vertically scrollable container (CSS `overflow-y: auto; height: 100vh;`) ensures forms are usable on small screens.
2. **Login / Signup** – forms update local `loginData` / `signupData` state; on submit, the memoized handler calls the appropriate API wrapper.
3. **Post‑login** – token stored, `fetchProfile` runs, `user` context updates, and the app redirects to the main chat view.

---

## Data Flow Diagram

```mermaid
graph LR
    subgraph Frontend
        A[AuthPage] --> B[useAuth Hook]
        B --> C[authHandlers (API wrapper)]
        C --> D[Backend API]
        D --> E[JWT Token]
        B --> F[fetchProfile]
        F --> G[accounts.Profile]
        G --> H[User Context]
    end
    subgraph Backend
        D --> I[accounts.views]
        I --> J[accounts.Profile Model]
        I --> K[User Model]
        D --> L[chat.views]
        L --> M[Message / Conversation Models]
    end
```

---

## Security & Encryption

- **Password hashing** – Django’s default `PBKDF2` with a per‑user salt.
- **Transport security** – In production, the API must be served behind HTTPS (e.g., via Nginx + Let's Encrypt).
- **JWT** – Short‑lived access token (default 5 min) + refresh token flow could be added later.
- **Future encryption** – The user requested “implement that encryption”.  The recommended approach is to store any client‑side encrypted payloads (e.g., end‑to‑end encrypted message bodies) using **libsodium** on the frontend and decrypt only in the browser.  Backend stores ciphertext only.

---

## Deployment & Development Workflow

1. **Backend** – `python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt`.
2. **Run migrations** – `python manage.py makemigrations && python manage.py migrate`.
3. **Start dev server** – `python manage.py runserver` (exposes `http://127.0.0.1:8000/`).
4. **Frontend** – `npm install && npm run dev` (Vite dev server on `http://localhost:5173`).
5. **CORS** – `django-cors-headers` allows the frontend dev origin.
6. **Testing** – `python manage.py test` for backend; `npm test` (Jest) for frontend.

---

## Glossary of Key Terms

- **JWT** – JSON Web Token, used for stateless authentication.
- **Profile** – User‑facing data (`display_name`, `avatar`, `bio`). Stored in `accounts.Profile`.
- **ChatMessage** – Individual message within a conversation.
- **Conversation** – A collection of messages between participants.
- **useMemo** – React hook that memoizes a value/computed function between renders.
- **CORS** – Cross‑Origin Resource Sharing, required for SPA to talk to the API.

---

## API Endpoints

### Authentication (accounts)
- **POST /api/login/** – Accepts `{email, password}`; returns `{access, refresh}` JWT tokens.
- **POST /api/register/** – Accepts `{email, password, display_name}`; creates `User` & `Profile`; returns JWT.
- **POST /api/forgot-password/** – Accepts `{email}`; sends reset link.
- **GET /api/profile/** – Returns current user's `Profile` data; requires `Authorization: Bearer <token>`.
- **PUT /api/profile/** – Updates `display_name`, `avatar`, `bio`.

### Chat (chat)
- **GET /api/chat/conversations/** – List of user's conversations.
- **POST /api/chat/conversations/** – Create new conversation.
- **GET /api/chat/conversations/{id}/** – Retrieve specific conversation and its messages.
- **POST /api/chat/messages/** – Create new message in a conversation.
- **GET /api/chat/messages/{id}/** – Retrieve a single message.

## Data Models

### accounts.Profile
```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='accounts_profile')
    display_name = models.CharField(max_length=150, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)
```

### chat.Message
```python
class Message(models.Model):
    conversation = models.ForeignKey('Conversation', on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
```

### chat.Conversation
```python
class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
```

## Mock Data API Endpoints

The frontend can use a mock server during development. The following endpoints mimic the real backend responses and are useful for UI testing.

### Authentication (mock)

- **POST /mock/api/login/** – Returns a static JWT token for any credentials.
- **POST /mock/api/register/** – Returns a new mock user profile and token.
- **POST /mock/api/forgot-password/** – Returns a success message.

### Chat (mock)

- **GET /mock/api/chat/conversations/** – Returns a list of pre‑seeded conversation objects.
- **GET /mock/api/chat/conversations/{id}/** – Returns a conversation with its messages.
- **POST /mock/api/chat/messages/** – Echoes back the posted message with a mock ID and timestamp.

## Mock Data Schemas

### UserProfile (mock)

```json
{
  "id": 1,
  "email": "user@example.com",
  "display_name": "Jane Doe",
  "avatar": "https://example.com/avatar.png",
  "bio": "Demo profile"
}
```

### Conversation (mock)

```json
{
  "id": 1,
  "participants": [1, 2],
  "created_at": "2026-01-01T12:00:00Z",
  "messages": [/* array of Message objects */]
}
```

### Message (mock)

```json
{
  "id": 101,
  "conversation": 1,
  "sender": 1,
  "content": "Hello, world!",
  "timestamp": "2026-01-01T12:01:00Z"
}
```

## Project Gaps & Next Steps

### ✅ What’s already in place

| Area | Implemented |
|------|-------------|
| **Backend – accounts** | User model, `Profile` model, JWT‑based login/register/forgot‑password, profile CRUD endpoints |
| **Backend – chat** | Basic `Message` and `Conversation` models |
| **Frontend – auth** | `useAuth` hook with token & user state, memoised handlers, scrollable `AuthPage`, API wrappers |
| **Dev servers** | Django and Vite dev servers running |

### 🚧 Missing / Incomplete Backend pieces

- **Serializers** for `Message` and `Conversation`
- **ViewSets / API endpoints** for chat CRUD operations
- **Permissions** (authenticated & participant checks)
- **Pagination & ordering** for large chat histories
- **Signal** to auto‑create a `Profile` on user creation
- **Unit tests** for serializers, viewsets, permissions
- **OpenAPI / Swagger** docs
- **Docker / CI pipeline** for reproducible builds
- **Environment‑based config** (secrets, DB settings)
- **Mock‑API server** implementation for `/mock/api/*`

### 🚧 Missing / Incomplete Frontend pieces

- **Chat UI** (conversation list, message view, input box)
- **State management** for selected conversation & messages (context or Redux)
- **Error & loading UI** for API calls
- **Token refresh flow** (refresh endpoint handling)
- **Responsive styling** with premium aesthetics (gradients, glassmorphism, micro‑animations)
- **Unit / integration tests** (Jest + React Testing Library)
- **Mock‑API toggle** (env var to switch base URL)
- **Production build & deployment scripts** (npm `build`, Dockerfile)

### 📋 Immediate Next Steps (Prioritized)
1. **Backend – Chat API**: create serializers, viewsets, URLs; secure with `IsAuthenticated` and participant permission.
2. **Frontend – Basic Chat UI**: implement conversation list & message window; connect to new endpoints.
3. **Permissions & Security**: add permission classes, write a quick test to verify access control.
4. **Testing**: add a few unit tests for the new serializers and viewsets.
5. **Mock Server**: spin up a local mock server (e.g., `json-server`) serving `/mock/api/*` and add an env flag.
6. **Styling & UX**: apply premium visual design to chat components using a modern font (Inter) and subtle animations.

### 🌱 Long‑Term Enhancements
- **WebSockets / Django Channels** for real‑time messaging
- **End‑to‑end encryption** of message payloads
- **File uploads** (avatars, media messages)

---

**End of Document**
