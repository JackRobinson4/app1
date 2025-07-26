# WordPress Mastery Learning Platform

## Overview

This is a full-stack WordPress learning platform built with React, Express, and PostgreSQL. The application provides an interactive course system where users can learn WordPress development through structured lessons, track their progress, and earn achievements. The platform features both free and premium content with user authentication via Replit's OAuth system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with structured route handlers
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Session Management**: Express sessions with PostgreSQL storage

### Database Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Connection pooling via @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit OAuth integration with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **Security**: HTTP-only cookies, secure flags, and CSRF protection
- **User Management**: Automatic user creation/updates from OAuth claims

### Course Management
- **Categories**: 8 comprehensive learning paths:
  1. WordPress Foundations (5 lessons) - Introduction, local development, dashboard mastery, content creation, media management
  2. Hosting & Installation (4 lessons) - Domain setup, hosting selection, WordPress installation
  3. WordPress Fundamentals (4 lessons) - Dashboard mastery, security, themes, plugins
  4. Content & Structure (4 lessons) - Custom post types, ACF, user roles, Gutenberg blocks
  5. Theme Development (5 lessons) - Theme structure, template hierarchy, Loop, Customizer, FSE
  6. Plugin Development (5 lessons) - Plugin basics, hooks, shortcodes, admin pages, AJAX
  7. API & Headless WordPress (4 lessons) - REST API, custom endpoints, headless, Gutenberg blocks
  8. Performance & SEO (2 lessons) - Optimization, migration, maintenance
- **Lessons**: 33 comprehensive lessons with detailed content, practice exercises, and video placeholders
- **Progress Tracking**: User completion status and progress percentages with visual indicators
- **Achievement System**: Certificates and milestone tracking with gamification elements

### Content Delivery
- **Lesson Types**: Free and premium content with access control
- **Interactive Elements**: Practice modals and hands-on exercises
- **Progress Visualization**: Charts, progress bars, and completion indicators
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

### User Authentication Flow
1. Unauthenticated users see landing page
2. Login redirects to Replit OAuth
3. Successful auth creates/updates user record
4. Session established with secure cookies
5. Dashboard loads with personalized content

### Learning Progress Flow
1. User selects lesson from dashboard
2. System checks access permissions (free vs premium)
3. Lesson content loads with current progress
4. User interactions update progress in real-time
5. Completion triggers achievement checks
6. Dashboard reflects updated statistics

### Data Persistence
- User profiles and preferences stored in PostgreSQL
- Lesson progress tracked with timestamps and percentages
- Session data maintained for 7 days
- Achievement records for gamification

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection and pooling
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **express-session**: Session management
- **passport**: Authentication middleware

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first styling
- **Drizzle Kit**: Database migrations and introspection

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Error handling in development
- **@replit/vite-plugin-cartographer**: Development tooling
- Custom authentication flow for Replit environment

## Deployment Strategy

### Development Environment
- Hot module replacement via Vite
- TypeScript compilation with `tsx` for server
- Environment variables for database and auth configuration
- Replit-specific plugins for enhanced development experience

### Production Build
- Frontend: Vite builds optimized bundle to `dist/public`
- Backend: esbuild compiles server to `dist/index.js`
- Static file serving integrated with Express
- Database migrations via `drizzle-kit push`

### Database Configuration
- PostgreSQL connection via DATABASE_URL environment variable
- Schema definitions in `shared/schema.ts` for type safety
- Automatic connection pooling and error handling
- Session storage table automatically managed

### Security Considerations
- HTTPS-only cookies in production
- Environment-based configuration
- OAuth token validation and refresh
- SQL injection protection via parameterized queries