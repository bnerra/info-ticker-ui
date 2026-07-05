# Info Ticker UI

A real-time sports dashboard built with **React + Vite + TypeScript**, designed for fixed-resolution displays and live data streaming.

This UI connects to the Info Ticker API via **Server-Sent Events (SSE)** to render live MLB, NHL (COMING SOON), and system data.

---

## 🚀 Features

- 📡 Real-time updates via SSE
- ⚾ MLB live game dashboard
- 🏒 NHL game tracking (COMING SOON)
- 📊 Division standings & player stats modules
- 🌤️ Weather display integration
- 🧩 Modular dashboard layout system
- 📺 Fixed-resolution kiosk-style UI (1024×600 optimized)

---

## 🧱 Tech Stack

- React 19
- TypeScript
- Vite
- Server-Sent Events (EventSource API)
- Custom hooks architecture

---

## 🧠 Architecture Overview

The UI is structured as a real-time dashboard composed of three primary sections:

### 1. Top Bar (Status Row)
- Weather
- Clock
- API connection status

### 2. Primary Module (Dynamic Content)
- Live game view
- Concluded game view
- Upcoming game preview
- Automatically rotates based on game stat

### 3. Secondary Modules
- Batting leaders
- Pitching leaders
- Division standings
- Inning by Inning
- Supporting data panels

---

## 📡 Data Flow

The UI connects to the backend using SSE:

API (Render)

↓

SSE Stream (/api/live-games)

↓

React useLiveGames hook

↓

UI state updates

---

## 🔌 Environment Variables

Create a `.env.production` file:

```bash
VITE_API_URL=https://your-api.onrender.com
```

---

## 🧩 Key Hooks

### Live Game Data

```TypeScript
useLiveGames()
```

Connects to SSE stream and returns live game state.

---

## 🖥️ Running Locally

### Install dependencies
```bash
npm install
```

### Start dev server
```bash
npm run dev
```

### Build production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

---

## 🌐 Deployment (Cloudflare Pages)

Recommended deployment platform: **Cloudflare Pages**

### Build Settings:

- Build command:

```bash
npm install && npm run build

```

- Output directory:

```bash
dist
```

### Environment variable:

```bash
VITE_API_URL=https://your-api.onrender.com
```

---

## 📺 Design Philosophy

This project is intentionally designed as a **fixed-resolution dashboard system**, optimized for:

- 1024x600 displays (primary target)
- kiosk mode screens
- TV-style dashboards
- secondary browser display panels

To maintain a consistent layout across all screen sizes, the UI scales aas a single unit rather than relying on traditional responsive breakpoints.

---

## ⚠️ Notes

- Requires backend API to be running for live data
- SSE connection will auto-reconnect on failure
- Layout is not traditional responsive web designn (intentional)

---

## 📄 License

MIT

---

# Screenshots

Example views of the live application.

## Upcoming Game with Standings

<img width="893" height="577" alt="Screenshot 2026-07-05 052842" src="https://github.com/user-attachments/assets/0982efc8-5ce2-4fc8-954e-0f8c18eb47f1" />

## Completed Game with Inning by Inning

<img width="893" height="573" alt="Screenshot 2026-07-05 052856" src="https://github.com/user-attachments/assets/5c369c5a-3333-4936-a831-ca91a0641f95" />

## Completed Game with Batting Leaders

<img width="891" height="577" alt="Screenshot 2026-07-05 052742" src="https://github.com/user-attachments/assets/e610b6ef-49ba-4b92-8dcb-ebbbb3f39f6e" />

## Completed Game with Pitching Decisions

<img width="895" height="577" alt="Screenshot 2026-07-05 052823" src="https://github.com/user-attachments/assets/353f747e-bff4-4010-b507-8ba1f254b3fb" />
