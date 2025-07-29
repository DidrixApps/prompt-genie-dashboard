# AI Development Rules

This document outlines the rules and conventions for AI-driven development of this application. Adhering to these guidelines ensures consistency, maintainability, and leverages the chosen tech stack effectively.

## Tech Stack Overview

This project is built with a modern, component-based architecture. Key technologies include:

*   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/) for a fast development experience.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for a pre-built, accessible, and customizable component library built on Radix UI.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
*   **Routing**: [React Router](https://reactrouter.com/) for client-side navigation.
*   **Data Fetching & Server State**: [TanStack Query](https://tanstack.com/query/latest) for managing asynchronous operations and caching server state.
*   **Forms**: [React Hook Form](https://react-hook-form.com/) for performant form handling, paired with [Zod](https://zod.dev/) for schema validation.
*   **Icons**: [Lucide React](https://lucide.dev/) for a comprehensive and consistent set of icons.
*   **Notifications**: A combination of `sonner` and a custom `useToast` hook for rich notifications.

## Library Usage and Coding Conventions

### 1. Component Development
*   **Primary Component Library**: **ALWAYS** use components from `shadcn/ui` whenever possible. Import them from `@/components/ui/...`.
*   **Custom Components**: Only create new components in `src/components/` if a suitable `shadcn/ui` component does not exist. Keep components small and focused on a single responsibility.
*   **Styling**: Use **Tailwind CSS utility classes** for all styling. Do not write custom CSS in `.css` files. Use the `cn` utility function from `@/lib/utils.ts` to conditionally apply classes.

### 2. Routing
*   **Router**: Use `react-router-dom` for all navigation.
*   **Route Definitions**: All top-level routes **MUST** be defined in `src/App.tsx`.

### 3. State Management
*   **Server State**: Use `@tanstack/react-query` for fetching, caching, and managing data from APIs.
*   **Client State**: For local component state, use React's built-in hooks (`useState`, `useReducer`, `useContext`).

### 4. Forms
*   **Form Logic**: Use `react-hook-form` for handling form state, validation, and submissions.
*   **Validation**: Use `zod` to define validation schemas for forms.

### 5. Icons
*   **Icon Set**: Exclusively use icons from the `lucide-react` package.

### 6. Notifications (Toasts)
*   **Toasts**: Use the custom `useToast` hook imported from `@/hooks/use-toast.ts` to display notifications. This ensures consistency with the application's theme and design.

### 7. File Structure
*   **Pages**: Place page-level components (routed components) in `src/pages/`.
*   **Reusable Components**: Place shared, reusable components in `src/components/`.
*   **Custom Hooks**: Place custom hooks in `src/hooks/`.
*   **Utilities**: Place general utility functions in `src/lib/`.