# ForgotPassword.tsx

This screen handles the full password recovery flow in `src/Component/ForgotPassword.tsx`.

## Flow

1. The user enters an email address.
2. The app calls `POST /apis/auth/forget-password` to send a verification code.
3. The user enters the code shown in their inbox.
4. The app calls `POST /apis/auth/verify-email` to confirm the code.
5. After verification, the user sets a new password.
6. The app calls `POST /apis/auth/reset-password` to finish the reset.

## Notes

- The screen uses `AuthLayout` so it matches the login and signup pages.
- The resend code action calls `POST /apis/auth/resend-verification`.
- Keep the copy short and direct so the recovery steps stay easy to follow.