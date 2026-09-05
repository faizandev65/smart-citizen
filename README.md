# SmartCitizen — Civic-Tech Complaint & Service Request System

> **Academic Major Project**  
> Developed & Administered by: **Md Faizan Mustafa** (Project Administrator)  
> Technology: **React 19 • TypeScript • Tailwind CSS v4 • Vite**

---

## 🏛️ Project Overview

**SmartCitizen** is a modern civic-technology web application engineered to bridge the communication gap between citizens and municipal service administrations. It provides a transparent, dual-portal ecosystem featuring a citizen-facing portal for grievance redressal and on-demand municipal utility booking, coupled with an administrative command center for municipal grievance lifecycle management, SLA monitoring, and field crew dispatch.

> [!NOTE]
> **Academic Project Disclaimer:**  
> This application is developed exclusively as an **Academic Demonstration Project**. It is **not** affiliated with, operated by, or endorsed by any real municipal corporation, government department, or public administrative authority. All officer identities, service tickets, citizen records, and geographic references are purely illustrative demo data.

---

## ✨ Key Features

### 👤 1. Citizen Portal
- **Secure Authentication & Identity**: Realistic registration and login with local session persistence. Registered citizen identity (name, phone, email, ward) seamlessly synchronizes across all modules.
- **Interactive Civic Dashboard**: Real-time summary cards, quick action links, active grievance tracking, and utility request monitoring.
- **Multi-Category Grievance Submission**: 6-step guided complaint submission including category selection (Roads, Water, Sanitation, Streetlights, etc.), priority assignment, GPS location capture, ward selection, photo attachments, and duplicate detection warnings.
- **Real-Time Redressal Tracking**: Granular 5-stage timeline visualizer (`Submitted` → `Under Review` → `Assigned` → `In Progress` → `Resolved`), SLA countdown badges, assigned engineer details, and live activity logs.
- **Municipal Utility Services**: On-demand booking engine for municipal water tankers, septic tank desilting, bulk garbage collection, tree pruning, street dog immunization, and fogging operations.
- **Live Civic Map & Heatmap**: Interactive map view showcasing verified municipal issues, resolution hot-spots, and zone-wise status markers.
- **Citizen Profile & Preferences**: Profile editor, ward configuration, notification preferences, emergency contact management, and session controls.

### 🛡️ 2. Administrative Control Center
- **Protected Officer Authentication**: Dedicated `/admin/login` access control protecting all `/admin/*` routes with automatic redirects for unauthenticated sessions.
- **Administrative Command Desk**: High-level statistical summaries, urgent SLA breach alerts, ward-wise grievance distribution charts, and departmental workload metrics.
- **Grievance Redressal Dispatch**: Filterable triage grid supporting instant status transitions, officer/crew reassignment, priority escalation, and resolution note publishing.
- **Municipal Service Operations**: Real-time dispatch scheduler for municipal utility requests with operational vehicle and crew assignment.
- **Citizen Directory & Ward Analytics**: Comprehensive directory of registered citizens, submission frequency stats, and ward-level resolution performance indicators.
- **System Audit & Activity Logs**: Immutable chronological activity stream logging every status change, service dispatch, and officer intervention.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Framework**: [React 19](https://react.dev/) (Functional Components, Custom Hooks, Context API)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-safety, comprehensive interface definitions)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) (Responsive layouts, custom civic blue theme, dark-navy admin aesthetic)
- **Iconography**: [Lucide React](https://lucide.dev/) (Consistent semantic iconography)
- **Routing**: [React Router v7 / SPA Navigation](https://reactrouter.com/) (Role-based route guarding & automatic redirection)
- **State Management & Persistence**: Reactive State Architecture utilizing browser `localStorage` with automated pre-seeding for academic demonstrations.
- **Build Tooling**: [Vite](https://vitejs.dev/) with SWC / ESBuild for instant HMR and optimized production bundling.

---

## 🔐 Academic Demo Credentials

For evaluation and testing of the dual-portal workflow, pre-configured demo credentials are provided below:

### 🛡️ Municipal Administrative Portal (`/admin/login`)
| Field | Academic Demo Value |
| :--- | :--- |
| **Login URL** | `/admin/login` |
| **Official Admin ID / Email** | `admin@smartcitizen.demo` |
| **Password** | `SmartCitizen@Admin2026` |
| **Assigned Role** | Project Administrator (`Md Faizan Mustafa`) |

### 👤 Citizen Portal (`/login` or `/register`)
| Field | Academic Demo Value |
| :--- | :--- |
| **Login URL** | `/login` |
| **Mobile / Email** | `citizen.demo@smartcitizen.demo` *(or create any custom citizen account via `/register`)* |
| **Password** | `demo12345` |
| **Citizen Name** | Dynamic (matches exact registered user name) |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `yarn` / `pnpm`)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smart-citizen.git
   cd smart-citizen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** *(Optional)*:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled, optimized production assets will be generated in the `dist/` directory.

6. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Directory Structure

```text
smart-citizen/
├── .env.example             # Environment configuration template
├── .gitignore               # Git ignore rules for node_modules, build artifacts, env files
├── index.html               # HTML entry point with metadata
├── package.json             # Dependencies and project build scripts
├── tsconfig.json            # TypeScript compiler configuration
├── vite.config.ts           # Vite bundler configuration
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/           # Admin header, sidebar, triage tables, stats widgets
│   │   ├── citizen/         # Citizen sidebar, timeline widgets, profile cards
│   │   ├── layout/          # Public Navbar, Footer, Route wrappers
│   │   ├── modals/          # Auth modals, confirmation dialogs, quick view modals
│   │   └── ui/              # Buttons, badges, cards, input primitives
│   ├── data/                # Initial seed data for complaints, services, and notifications
│   ├── hooks/               # Custom React hooks (useAuth, useStorage, etc.)
│   ├── pages/               # Application Page Views
│   │   ├── admin/           # Admin Dashboard, Complaints, Services, Citizens, Analytics, Settings
│   │   ├── citizen/         # Citizen Dashboard, New Complaint, Track Complaints, Services, Profile
│   │   └── public/          # Landing Page, Login, Register, Admin Login, Services, Helpdesk
│   ├── types/               # TypeScript interface and type declarations
│   ├── App.tsx              # Root component & route dispatcher
│   └── main.tsx             # Application bootstrap
```

---

## 📄 License & Attribution

- **Project Type**: Academic Major Project
- **Lead Developer & Administrator**: **Md Faizan Mustafa**
- **License**: Distributed for academic evaluation and demonstration purposes. All rights reserved.

