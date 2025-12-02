# OstrideLabs Tasks - ToDo List Application

A modern, feature-rich ToDo list application built with React, TypeScript, and Vite.

## Features

✅ **Display ToDo Items**: View a list of all your tasks with unique IDs, titles, and descriptions  
✅ **Add Tasks**: Create new todo items with a title and optional description  
✅ **Edit Tasks**: Update existing tasks inline with a clean editing interface  
✅ **Delete Tasks**: Remove tasks you no longer need  
✅ **Clean UI**: Modern, responsive design with intuitive controls

## Project Structure

```
src/
├── App.tsx                    # Main application component with state management
├── App.css                    # Application styles
├── components/
│   ├── TodoForm.tsx          # Form component for adding/editing todos
│   ├── TodoForm.css          # TodoForm styles
│   ├── TodoList.tsx          # List container component
│   ├── TodoList.css          # TodoList styles
│   ├── TodoItem.tsx          # Individual todo item component
│   └── TodoItem.css          # TodoItem styles
└── types/
    └── Todo.ts               # TypeScript interface for Todo items
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1. **Add a Todo**: Fill in the title and description (optional) in the form at the top and click "Add Todo"
2. **Edit a Todo**: Click the "Edit" button on any todo item to modify it inline
3. **Delete a Todo**: Click the "Delete" button to remove a todo from the list
4. **View Details**: Each todo displays its unique ID, title, and description

## Technology Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with modern CSS features

## Data Model

Each Todo item has the following structure:

```typescript
interface Todo {
  id: string;          // Unique identifier (timestamp + random string)
  title: string;       // Task title (required)
  description: string; // Task description (optional)
}
```

## Component Architecture

- **App.tsx**: Main component managing application state and business logic
  - Manages the todos array in state
  - Provides CRUD operations (addTodo, deleteTodo, editTodo)
  - Generates unique IDs for new todos

- **TodoForm**: Reusable form component for creating and editing todos
  - Can be used in "add" or "edit" mode
  - Form validation for required fields
  - Clears inputs after submission

- **TodoList**: Container component that renders the list of todos
  - Shows empty state when no todos exist
  - Maps through todos and renders TodoItem components

- **TodoItem**: Individual todo card with edit and delete functionality
  - Displays todo details (ID, title, description)
  - Inline editing using TodoForm
  - Delete and Edit buttons

## Implementation Details

### State Management
The application uses React's `useState` hook to manage the todo list at the top level in `App.tsx`. All CRUD operations are implemented as functions in the App component and passed down to child components as props.

### ID Generation
Each todo gets a unique ID combining the current timestamp with a random string:
```typescript
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
```

### Inline Editing
When the Edit button is clicked on a todo item, the component switches to edit mode and displays the TodoForm inline. The form is pre-populated with the existing todo data and provides Update and Cancel buttons.

