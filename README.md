# JanSahay – Frontend

JanSahay is a platform that helps citizens discover government welfare schemes relevant to them. This repository contains the **React (Vite) frontend** for JanSahay — the user-facing app for browsing schemes, getting personalized recommendations, and the admin panel for managing them.

**Live site:** `https://jansahay-frontend.vercel.app`
**Backend repo:** [jansahay-backend](https://github.com/hardikrana929/jansahay-backend)

---

## 📖 About

Government welfare schemes are often scattered across multiple portals and hard to discover. JanSahay centralizes them in one place, lets users build a simple eligibility profile, and returns schemes that actually match them — instead of making users search through dozens of government websites manually.

---

## ✨ Features

- 🔐 **Authentication flows** — Register, login, OTP-based forgot/reset password
- 👤 **Profile builder** — Guided profile completion used to personalize scheme results
- 🎯 **Recommendations** — Personalized scheme feed with search, filters, and sorting
- 📋 **Scheme browsing** — View all schemes and open individual scheme details
- ⭐ **Favorites** — Save schemes and manage them from a dedicated page
- 💬 **Feedback** — Submit feedback directly from the app
- 🛠️ **Admin panel** — Separate admin layout for managing schemes and feedback, with dashboard stats
- 🌗 **Dark mode** — App-wide theme toggle via context
- 🌐 **Multi-language support** — English, Hindi, and Gujarati (via i18next)
- 🛣️ **Protected routing** — Route guards for logged-in users and admin-only pages
- 📱 **Responsive UI** — Built with Tailwind CSS and animated with Framer Motion

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Animation | Framer Motion |
| Internationalization | i18next / react-i18next |
| Notifications | react-hot-toast |
| Icons | react-icons |
| Loaders | react-spinners |
| Deployment | Vercel |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel UI (sidebar, tables, forms)
│   │   ├── common/         # Navbar, Footer, shared UI
│   │   ├── dashboard/      # Dashboard widgets
│   │   ├── favorites/      # Favorites page components
│   │   ├── feedback/       # Feedback form/components
│   │   ├── home/           # Landing page sections (Hero, Features, etc.)
│   │   ├── Profile/        # Profile form components
│   │   ├── recommendation/ # Recommendation feed components
│   │   └── schemes/        # Scheme list/detail components
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state, login/logout/session check
│   │   └── ThemeContext.jsx    # Dark/light theme
│   ├── hooks/
│   │   └── Usedebounce.js
│   ├── layouts/
│   │   ├── MainLayout.jsx      # Public/user layout
│   │   └── AdminLayout.jsx     # Admin panel layout
│   ├── locales/                # en / hi / gu translation files
│   ├── pages/
│   │   ├── admin/               # Admin pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx / Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── CompleteProfile.jsx / Profile.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Schemes.jsx / SchemeDetails.jsx
│   │   ├── Recommendations.jsx
│   │   ├── Favorites.jsx
│   │   ├── Feedback.jsx
│   │   └── NotFound.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx  # Requires logged-in user
│   │   └── AdminRoute.jsx      # Requires admin role
│   ├── services/                # API calls per feature (axios-based)
│   ├── utils/constants.js
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- The [jansahay-backend](https://github.com/hardikrana929/jansahay-backend) API running locally or deployed

### Installation

```bash
git clone https://github.com/hardikrana929/jansahay-frontend.git
cd jansahay-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

Point this at your deployed backend URL in production.

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🔐 Authentication

The app authenticates against the backend using an httpOnly cookie-based session (not localStorage) — the browser sends the session cookie automatically on API requests, so the frontend never handles the raw token. `AuthContext` checks session state on load via `/auth/me` and exposes `user`, `login`, `logout`, and `loading` to the rest of the app. `ProtectedRoute` and `AdminRoute` gate access to user-only and admin-only pages respectively.

---

## 🌐 Internationalization

Translations live in `src/locales/{en,hi,gu}.json` and are wired up via `i18n.js` using `i18next` with browser language detection. Add new keys to all three files to keep translations in sync.

---

## 🤝 Contributing

Issues and pull requests are welcome. Please open an issue first to discuss what you'd like to change.

## 👤 Author

**Asavala Hardik**
GitHub: [@hardikrana929](https://github.com/hardikrana929)
