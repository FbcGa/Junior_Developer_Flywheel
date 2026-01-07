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

5. **Database Setup**

   Create a `tasks` table in your Supabase database:

   ```sql
   CREATE TABLE tasks (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT,
     status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
     is_completed BOOLEAN DEFAULT FALSE,
     start_date DATE,
     due_date DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can only see their own tasks
   CREATE POLICY "Users can view own tasks" ON tasks
     FOR SELECT USING (auth.uid() = user_id);

   -- Policy: Users can insert their own tasks
   CREATE POLICY "Users can insert own tasks" ON tasks
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   -- Policy: Users can update their own tasks
   CREATE POLICY "Users can update own tasks" ON tasks
     FOR UPDATE USING (auth.uid() = user_id);

   -- Policy: Users can delete their own tasks
   CREATE POLICY "Users can delete own tasks" ON tasks
     FOR DELETE USING (auth.uid() = user_id);
   ```

6. **Stop the application**
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

#### 1. **Screaming Architecture**

- Feature-based organization (`(tasks)` folder)
- Clear separation of concerns: components, services, helpers, hooks
- Business logic isolated from UI components
- Easy to understand what the app does at a glance

#### 2. **Custom Hooks for Business Logic**

- `useTaskFilter` - Manages both completion filter and search in a single hook
- `useIsMobile` - Responsive behavior detection
- Keeps components clean and focused on presentation
- Reusable and testable logic

#### 3. **Mapper Pattern**

- `taskMappers.ts` - Transforms between database and domain models
- Prevents database schema leakage into the application
- Makes it easy to change database structure without affecting UI
- Single source of truth for data transformations

#### 4. **Service Layer**

- All API calls isolated in service functions
- Consistent error handling
- Easy to mock for testing
- Clear separation between UI and data access

#### 5. **Combined Filtering Strategy**

- Single hook manages multiple filters (completion + search)
- Efficient single-pass filtering with memoization
- Filters applied together in one operation
- Better performance than chaining multiple filters

#### 6. **Server/Client Component Split**

- Server components for data fetching (`page.tsx`)
- Client components for interactivity (`task-board-content.tsx`)
- Optimizes bundle size and performance
- Follows Next.js 14+ best practices

#### 7. **Optimistic UI Updates**

- Toggle completion updates UI immediately
- Rollback on error with proper error messages
- Better user experience with perceived performance

### Technology Choices

- **Next.js 16** - Latest features, App Router, Server Components
- **TypeScript** - Type safety and better developer experience
- **Supabase** - PostgreSQL database, authentication, and real-time features
- **Shadcn UI** - Customizable, accessible components
- **Formik + Yup** - Form handling and validation
- **Tailwind CSS** - Utility-first styling with great DX
- **Docker** - Consistent development environment

### Trade-offs

1. **Client-side filtering vs Server-side**

   - **Chosen**: Client-side filtering
   - **Pros**: Instant response, no network latency, works offline
   - **Cons**: All tasks loaded at once, could be slow with 1000+ tasks
   - **Mitigation**: Add pagination or virtual scrolling if needed

2. **Refresh after mutations vs Optimistic updates**

   - **Chosen**: Refresh for most operations, optimistic for toggle completion
   - **Pros**: Simple, always shows correct server state
   - **Cons**: Network latency visible for create/update/delete
   - **Future**: Implement optimistic updates for all operations

3. **Monolithic mappers vs Separate files**

   - **Chosen**: Combined in `taskMappers.ts`
   - **Pros**: Related logic together, easier to maintain
   - **Cons**: File could grow large with more entities
   - **Mitigation**: Keep focused on task-related mappings only

4. **Form library vs Custom forms**
   - **Chosen**: Formik + Yup
   - **Pros**: Robust validation, good DX, mature ecosystem
   - **Cons**: Larger bundle size, some boilerplate
   - **Alternative**: React Hook Form (lighter) or TanStack Form (newer)

## 🎯 What I Would Improve With More Time

1. **Drag and Drop**

   - Add drag-and-drop to move tasks between columns
   - Use `@dnd-kit/core` or `react-beautiful-dnd`
   - Better UX than editing status in form

2. **Optimistic Updates**

   - Implement for all CRUD operations
   - Reduce perceived latency
   - Better offline experience

3. **Testing**

   - Unit tests for hooks and utilities
   - Integration tests for services
   - E2E tests for critical flows
   - Target: 80%+ coverage

4. **Advanced Filtering**

   - Filter by date ranges
   - Multiple status filters

5. **Notifications**

   - Due date reminders
   - Task assignments
   - Real-time updates using Supabase subscriptions

## 📚 Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript 5
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS 4
- **Forms**: Formik + Yup
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Theme**: next-themes
- **Package Manager**: pnpm
- **Containerization**: Docker

## 👨‍💻 Author

Built with ❤️.
