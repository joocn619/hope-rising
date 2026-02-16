# HopeRising Vercel Deployment Guide

This guide will help you deploy **HopeRising** to Vercel, the recommended platform for Next.js applications.

## Prerequisites

1.  A [Vercel Account](https://vercel.com/signup).
2.  Your project pushed to a GitHub repository.

## Step 1: Environment Variables

You need to provide Vercel with the same environment variables found in your local `.env.local` file.

Gather the following values:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (If using Stripe features)
- `STRIPE_SECRET_KEY` (Server-side only)

## Step 2: Deploy via Vercel Dashboard

1.  Log in to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your **HopeRising** GitHub repository.
4.  In the **Configure Project** screen:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**: expand this section and add the variables from Step 1.
5.  Click **Deploy**.

## Step 3: Firebase Authentication Settings

To ensure Google Sign-In and other auth methods work on your deployed site:

1.  Go to the **Firebase Console** -> **Authentication** -> **Settings** -> **Authorized Domains**.
2.  Add your Vercel deployment domain (e.g., `hope-rising.vercel.app`).

## Step 4: Verification

Once deployed:
1.  Visit your new URL.
2.  Test the **Sign Up** flow (create a new test account).
3.  Verify the **Dashboard** loads correctly.
4.  Test the **Urge Log** to ensure Firestore writes are working.

## Troubleshooting

-   **Build Errors**: Check the "Logs" tab in Vercel. Common issues include missing dependencies or TypeScript errors (run `npm run build` locally to check).
-   **Firestore Permission Denied**: Check your Firestore Security Rules in the Firebase Console.
