import { useState, useCallback, useMemo } from 'react';
import type { Todo } from '../types/Todo';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from './useTodosQuery';

/**
 * Custom hook that encapsulates all todo-related business logic
 * including CRUD operations, reordering, and state management
 *
 * This hook separates ordering (client-side) from data (server-managed via React Query)
 * to avoid state synchronization anti-patterns
 */
export function useTodoOperations() {
  // Store only the order of IDs, not the full todo objects
  const [todoOrder, setTodoOrder] = useState<string[]>([]);

  // React Query hooks
  const { data: serverTodos, isLoading, error } = useTodos();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  // Derive the ordered todos from server data and client order
  const todos = useMemo(() => {
    if (!serverTodos) return [];

    // If no custom order yet, return server order
    if (todoOrder.length === 0) return serverTodos;

    // Build a map for quick lookup
    const serverById = new Map(serverTodos.map((todo) => [todo.id, todo]));

    // Apply custom order, filtering out deleted todos
    const orderedTodos = todoOrder
      .map((id) => serverById.get(id))
      .filter((todo): todo is Todo => Boolean(todo));

    // Add any new todos from server that aren't in our order yet
    const orderedIds = new Set(todoOrder);
    const newTodos = serverTodos.filter((todo) => !orderedIds.has(todo.id));

    return [...orderedTodos, ...newTodos];
  }, [serverTodos, todoOrder]);

  const addTodo = useCallback(
    (newTodo: Omit<Todo, 'id'>) => {
      const todo: Todo = {
        ...newTodo,
        id: uuidv4(),
      };
      return createTodoMutation.mutateAsync(todo);
    },
    [createTodoMutation]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      return deleteTodoMutation.mutateAsync(id);
    },
    [deleteTodoMutation]
  );

  const editTodo = useCallback(
    (updatedTodo: Todo) => {
      return updateTodoMutation.mutateAsync(updatedTodo);
    },
    [updateTodoMutation]
  );

  const reorderTodo = useCallback(
    (activeId: string, overId: string) => {
      setTodoOrder((currentOrder) => {
        // Use current order if available, otherwise derive from current todos
        const orderToUse = currentOrder.length > 0
          ? currentOrder
          : (todos.map(t => t.id));

        const oldIndex = orderToUse.indexOf(activeId);
        const newIndex = orderToUse.indexOf(overId);

        if (oldIndex === -1 || newIndex === -1) return orderToUse;

        return arrayMove(orderToUse, oldIndex, newIndex);
      });
    },
    [todos]
  );

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    editTodo,
    reorderTodo,
    mutations: {
      create: createTodoMutation,
      update: updateTodoMutation,
      delete: deleteTodoMutation,
    },
  };
}

