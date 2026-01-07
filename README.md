# Tasky - Modern Task Manager

A beautiful, full-featured task management application built with Next.js, TypeScript, and Supabase.

## ✨ Features

- 🎯 **Kanban-style Task Board** - Organize tasks across To Do, In Progress, and Done columns
- 🔍 **Advanced Filtering** - Filter by completion status and search by title/description
- 🌓 **Dark Mode** - Beautiful light and dark themes with smooth transitions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ✅ **Task Management** - Create, edit, delete, and toggle task completion
- 📊 **Status Tracking** - Move tasks between different status columns
- 🔐 **Authentication** - Secure user authentication with Supabase
- ⚡ **Real-time Updates** - Automatic refresh after task operations
- 🎨 **Modern UI** - Built with Shadcn UI components and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- Docker and Docker Compose (for local development)
- Supabase account (or local Supabase instance)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Junior_Developer_Flywheel
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run with Docker (Recommended)**

   ```bash
   make up
   ```

   This will:

   - Build the Docker containers
   - Start the application
   - Enable watch mode for hot reloading

   The app will be available at `http://localhost:3000`

4. **Run without Docker**

   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

5. **Stop the application**
   ```bash
   make down
   ```

## 🏗️ Architecture & Design Decisions

### Project Structure

```
frontend/
├── app/
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── dashboard/
│   │   └── (tasks)/         # Task management feature
│   │       ├── components/  # UI components
│   │       ├── helpers/     # Utility functions & mappers
│   │       ├── hooks/       # Custom React hooks
│   │       ├── schemas/     # Validation schemas
│   │       ├── services/    # API/data access layer
│   │       └── types/       # TypeScript types
│   ├── shared/              # Shared components (navbar, UI)
│   └── lib/                 # Configuration & utilities
```

### Key Design Decisions

1. **Screaming Architecture** - Feature-based organization with clear separation of concerns (components, services, helpers, hooks)
2. **Custom Hooks** - Business logic isolated in reusable hooks (`useTaskFilter`, `useIsMobile`)
3. **Mapper Pattern** - Database abstraction layer preventing schema leakage into UI
4. **Service Layer** - All API calls isolated with consistent error handling
5. **Combined Filtering** - Single hook manages multiple filters with efficient memoization
6. **Server/Client Split** - Optimized Next.js architecture with server components for data, client for interactivity
7. **Optimistic Updates** - Immediate UI feedback with error rollback for better UX

### Technology Choices

- **Next.js 16** - Latest features, App Router, Server Components
- **TypeScript** - Type safety and better developer experience
- **Supabase** - PostgreSQL database, authentication, and real-time features
- **Shadcn UI** - Customizable, accessible components
- **Formik + Yup** - Form handling and validation
- **Tailwind CSS** - Utility-first styling with great DX
- **Docker** - Consistent development environment

### Trade-offs

1. **Client-side filtering** - Fast & offline-capable, but loads all tasks (add pagination if >1000 tasks)
2. **Router refresh** - Simple & reliable, but shows network latency (future: full optimistic updates)
3. **Combined mappers** - Easier maintenance, single source of truth for transformations
4. **Formik + Yup** - Mature & robust, but larger bundle (alternative: React Hook Form)

## 🎯 What I Would Improve With More Time

1. **Drag & Drop** - Move tasks between columns with `@dnd-kit/core`
2. **Full Optimistic Updates** - All CRUD operations with instant UI feedback
3. **Testing** - Unit, integration, and E2E tests (target: 80%+ coverage)
4. **Advanced Filtering** - Date ranges, multiple status filters
5. **Notifications** - Due date reminders, real-time updates via Supabase subscriptions

## 👨‍💻 Author

Built with ❤️.
