<div align="center">

# 🌍 Wanderlust

**Discover your next adventure — a full-stack travel booking experience.**

Browse handpicked destinations, book a trip, and manage your own travel listings.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-7C3AED)](https://better-auth.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)

[Frontend](https://github.com/riyad-devx/wanderlust-travel) · [Backend](https://github.com/riyad-devx/wanderlust-backend)

</div>

---

![Wanderlust banner](public/image/Banner.png)

## ✨ Overview

Wanderlust is a modern travel booking platform built with the **Next.js App Router**. Users can explore curated destinations, book packages, track their bookings, and publish their own destinations. Authentication is handled by **Better Auth** with a short-lived JWT that the frontend forwards to a separate **Express + MongoDB** API.

| | |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Express 5, MongoDB ([wanderlust-backend](https://github.com/riyad-devx/wanderlust-backend)) |
| **Auth** | Better Auth + MongoDB adapter + JWT plugin |
| **UI** | shadcn (base-nova / Base UI), Lucide icons |

## 🚀 Features

- 🏝️ **Featured destinations carousel** — powered by the backend, five picks on the homepage.
- 🔎 **Destination explorer** — browse all packages with price filtering and sorting.
- 📄 **Destination details** — full overview, highlights, rating, and a booking panel.
- ➕ **Add destination** — publish a new trip with images and details.
- ✏️ **Edit & delete** — update or remove a destination you own.
- 🧾 **My bookings** — view and cancel upcoming trips.
- 🔐 **Authentication** — email/password sign up, login, persistent sessions, protected routes.
- 📱 **Responsive design** — mobile-first layout with a collapsible navbar.

## 🧭 Pages

| Route | Description |
| --- | --- |
| `/` | Homepage: banner, featured destinations, testimonials, CTA |
| `/destinations` | All destinations with filters and sorting |
| `/destinations/[id]` | Destination details, booking, edit and delete |
| `/add-destination` | Create a new destination 🔒 |
| `/my-bookings` | User bookings and cancellation 🔒 |
| `/login` / `/signup` | Authentication |

🔒 = requires a signed-in session.

## 🔐 How auth works

1. The user signs up or logs in through **Better Auth** (`/api/auth/[...all]`).
2. The client requests a short-lived JWT from `/api/auth/token` (`authFetch` helper).
3. Requests to the Express API include `Authorization: Bearer <token>`.
4. The backend verifies the token against Better Auth's JWKS endpoint (`/api/auth/jwks`, protected by `JWKS_ACCESS_KEY`).
5. `src/proxy.ts` (Next 16's middleware replacement) redirects guests away from protected routes.

## 🔌 API reference

The frontend talks to the backend at `NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Auth | Purpose |
| --- | --- | :---: | --- |
| `GET` | `/destination` | — | List all destinations |
| `GET` | `/featured-destinations` | — | List the first 5 destinations |
| `GET` | `/destination/:id` | ✅ | Get one destination |
| `POST` | `/add-destination` | ✅ | Create a destination |
| `PUT` / `PATCH` | `/destination/:id` | ✅ | Update a destination |
| `DELETE` | `/destination/:id` | ✅ | Delete a destination |
| `POST` | `/booking` | ✅ | Create a booking |
| `GET` | `/my-booking?email=` | ✅ | List the user's bookings |
| `DELETE` | `/booking/:id` | ✅ | Cancel a booking |

## 📁 Project structure

```text
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth handler
│   ├── add-destination/             # Create destination page
│   ├── destinations/                # List + [id] details
│   ├── login/ · signup/             # Auth pages
│   ├── my-bookings/                 # Bookings page
│   ├── globals.css                  # Tailwind v4 tokens
│   └── layout.tsx                   # Root layout (Navbar + Footer)
├── components/
│   ├── Home/                        # Banner, featured, testimonials, CTA
│   ├── Destination/                 # Edit / delete dialogs
│   ├── Booking/                     # Booking cards
│   └── ui/                          # shadcn base-nova components
├── lib/
│   ├── auth.ts                      # Better Auth server config
│   ├── auth-client.ts               # Better Auth React client
│   └── auth-fetch.ts                # Authenticated fetch helper
└── proxy.ts                         # Route protection (Next 16 proxy)
```

## 🛠️ Getting started

### Prerequisites

- Node.js 20+
- MongoDB database (Atlas or local)
- The [backend server](https://github.com/riyad-devx/wanderlust-backend) running on `http://localhost:8000`

### 1. Clone & install

```bash
git clone https://github.com/riyad-devx/wanderlust-travel.git
cd wanderlust-travel
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://...
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-random-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
JWKS_ACCESS_KEY=shared-secret-with-backend
```

### 3. Start the backend

```bash
git clone https://github.com/riyad-devx/wanderlust-backend.git
cd wanderlust-backend
npm install
node index.js
```

The API starts at `http://localhost:8000` and must be running before using destination or booking features.

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build + type check |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check only |

## ☁️ Deployment

The frontend deploys cleanly on **Vercel**:

1. Import the repository in Vercel.
2. Add all environment variables from the table above.
3. Set `BETTER_AUTH_URL` to your deployed frontend URL.
4. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL (no trailing slash).
5. Deploy 🚀

> **Tip:** Keep the backend's CORS configuration permissive enough to allow `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and `OPTIONS` requests with the `Authorization` header.

## 🔗 Related repositories

- **Frontend** — [riyad-devx/wanderlust-travel](https://github.com/riyad-devx/wanderlust-travel)
- **Backend** — [riyad-devx/wanderlust-backend](https://github.com/riyad-devx/wanderlust-backend)

---

<div align="center">

Made with ❤️ and a lot of ☕ · Happy travels! ✈️

</div>
