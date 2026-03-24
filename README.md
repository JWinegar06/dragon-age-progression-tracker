# Dragon Age Progression Tracker

## Project Title
**Dragon Age Progression Tracker**

## Project Description
Dragon Age Progression Tracker is a simple full-stack web app for tracking playthrough progress across Dragon Age games. It is built with **Next.js**, **Tailwind CSS**, **Firebase Authentication**, **Cloud Firestore**, and **React Hook Form**.

The app lets users create an account or sign in, then save and manage their own game progress entries in real time. It is designed to be clean, responsive, and easy to use on desktop or mobile.

### Key Features
- **User Authentication**
  - Sign up and log in with Firebase Authentication
  - Google sign-in with Firebase Auth
- **Progress Logging**
  - Add entries with:
    - game title
    - platform
    - genre
    - status
    - hours played
    - completion percentage
    - notes
    - favorite toggle
- **Filters & Categories**
  - Filter progress by platform, genre, status, and favorites
- **Real-Time Storage**
  - Store and sync progress entries with Cloud Firestore
- **Dark Mode Support**
  - Light and dark theme toggle
- **Mobile-Friendly UI**
  - Responsive layout using Tailwind CSS

---

## Tech Stack
### Frontend
- Next.js
- React
- Tailwind CSS
- React Hook Form

### Backend / Services
- Firebase Authentication
- Cloud Firestore

> Note: This project uses **Next.js API routes** for app endpoints, so the frontend and backend live in the same repository.

---

## Project Structure

dragon-age-progression-tracker/
├── app/
│   ├── api/
│   │   ├── entries/
│   │   │   ├── route.js
│   │   │   └── [id]/
│   │   │       └── route.js
│   │   └── auth/
│   │       └── session/route.js
│   ├── login/
│   ├── signup/
│   ├── dashboard/
│   ├── layout.js
│   └── page.js
├── components/
├── lib/
│   ├── firebase.js
│   ├── auth.js
│   └── firestore.js
├── public/
├── styles/
├── .env.local
├── package.json
└── README.md

---

```
### Dependencies Used

### Main Dependencies

npm install firebase react-hook-form clsx

### Core Framework
These are usually included by Next.js setup:

npm install next react react-dom


### Tailwind (if needed)

npm install -D tailwindcss postcss autoprefixer

---

## Usage Instructions

### 1. Start the app
Run:
```bash
npm install
npm run dev
```

Open:
```bash
http://localhost:3000
```

### 2. Create an account or sign in
- Go to the login or sign-up page
- Register using email/password, or
- Use the **Continue with Google** button

### 3. Access protected pages
After signing in:
- you will be redirected to the dashboard
- protected pages should only be accessible to logged-in users

If you are not logged in and try to visit a restricted page, the app should redirect you back to the login page.

### 4. Test Create
- Open the dashboard
- Fill out the progress form
- Add a new Dragon Age entry
- Confirm the entry appears in the list

### 5. Test Read
- View saved entries on the dashboard
- Refresh the page
- Confirm the data is still there from Firestore

### 6. Test Update
- Edit an existing entry
- Change status, hours played, or notes
- Save changes
- Confirm updates appear immediately

### 7. Test Delete
- Delete an entry from the list
- Confirm it disappears from the UI
- Refresh to verify it was removed from Firestore

### 8. Test Filters
- Add multiple entries with different platforms/statuses
- Filter by:
  - platform
  - genre
  - status
  - favorites
- Confirm only matching entries are shown

### 9. Test Dark Mode
- Toggle dark mode in the UI
- Confirm theme colors change correctly on desktop and mobile

---

## Firestore Security Rules
Use rules similar to these so users can only access their own data:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /progress/{document} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
  }
}

```

## Future Improvements
- Charts for completion stats
- Achievement checklist
- Upload cover art
- Sorting by most played or most recently updated
- Export/import save data
- Admin dashboard

---

## License
This project is for educational and portfolio use.