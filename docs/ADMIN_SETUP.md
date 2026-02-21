# Admin Setup Guide

## Environment Variables
Ensure the following environment variables are set in your `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Creating an Admin User
Since there is no public registration for admin users, you must create the initial admin account via the Firebase Console:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to **Authentication** > **Users**.
4. Click **Add user**.
5. Enter the email and password for the admin account.
6. Click **Add user**.

Now you can log in at `/admin/login` with these credentials.

## Protected Routes
The following routes are protected and require authentication:
- `/admin/dashboard`
- `/admin/products`
- `/admin/categories`
- `/admin/settings`

Any attempt to access these routes without being logged in will redirect to `/admin/login`.
