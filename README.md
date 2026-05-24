# Auth App

This project is split into two parts:

- `auth/` - Express, MongoDB, and nodemailer backend
- `my-app/` - React + Vite frontend

The frontend handles the UI and form flow. The backend handles account creation, login, email verification, password recovery, and password reset.

## How it works

### 1. Register

The user opens the signup screen in the frontend and submits an email and password.

The frontend sends `POST /apis/auth/register` to the backend.

The backend:

- checks whether the user already exists
- hashes the password
- generates a verification code
- stores the user in MongoDB
- sends the verification email
- returns a JWT token

### 2. Verify email

The user enters the code from the email.

The frontend sends `POST /apis/auth/verify-email`.

The backend checks the code, marks the user as verified, clears the code, and sends a welcome email.

### 3. Login

The login screen sends `POST /apis/auth/login` with email and password.

If the credentials are valid, the backend returns a JWT token and the frontend stores it in `localStorage` as `auth_token`.

### 4. Forgot password

The recovery flow has three steps:

- request a reset code with `POST /apis/auth/forget-password`
- verify the code with `POST /apis/auth/verify-email`
- update the password with `POST /apis/auth/reset-password`

The frontend keeps these steps in one flow so the user does not have to jump between screens.

## Frontend routes

- `/` - login
- `/signup` - register
- `/verify-email` - verify new account
- `/forget-password` - password recovery
- `/home` - signed-in landing page

## Backend routes

All backend routes are mounted under `/apis/auth`.

- `POST /register`
- `POST /login`
- `POST /forget-password`
- `POST /verify-email`
- `POST /reset-password`

## Environment variables

Backend expects these values in its environment:

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - server port, optional
- `GOOGLE_CLIENT_ID` - used as the SMTP password in the current mailer setup

## Development

### Backend

From `auth/`:

```bash
pnpm install
pnpm dev
```

### Frontend

From `my-app/`:

```bash
pnpm install
pnpm dev
```

## Project structure

### Backend

- `src/index.ts` - app bootstrap
- `src/config/db.ts` - MongoDB connection
- `src/controller/authContorller.ts` - auth logic
- `src/middleware/mailer.ts` - email sending
- `src/middleware/emailTemplate.ts` - reusable email HTML template
- `src/routes/authRoutes.ts` - API routes
- `src/User/UserModel.ts` - user model
- `src/Types/types.ts` - shared request types

### Frontend

- `src/App.tsx` - route setup
- `src/Component/AuthLayout.tsx` - shared auth UI shell
- `src/Component/LoginPage.tsx` - login screen
- `src/Component/Register.tsx` - signup screen
- `src/Component/VerifyEmail.tsx` - verification screen
- `src/Component/ForgotPassword.tsx` - password recovery flow
- `src/Component/Home.tsx` - signed-in landing page

## Notes

- Verification and welcome emails use the shared template in `auth/src/middleware/emailTemplate.ts`.
- The frontend stores only the auth token locally.
- The recovery screens are built to keep the user inside one clean flow instead of scattered pages.