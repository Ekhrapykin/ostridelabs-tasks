import { useState, useCallback, useMemo, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import type { Todo } from './types/Todo';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, CircularProgress, Alert } from '@mui/material';
import { arrayMove } from '@dnd-kit/sortable';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from './hooks/useTodosQuery';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);

  // React Query hooks
  const { data: serverTodos, isLoading, error } = useTodos();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  useEffect(() => {
    if (!serverTodos) {
      return;
    }

    setLocalTodos((currentTodos) => {
      const serverById = new Map(serverTodos.map((todo) => [todo.id, todo]));
      const orderedTodos = currentTodos
        .map((todo) => serverById.get(todo.id))
        .filter((todo): todo is Todo => Boolean(todo));
      const orderedIds = new Set(orderedTodos.map((todo) => todo.id));
      const newTodos = serverTodos.filter((todo) => !orderedIds.has(todo.id));

      return [...orderedTodos, ...newTodos];
    });
  }, [serverTodos]);

  const todos = useMemo(() => {
    return localTodos.length > 0 ? localTodos : serverTodos || [];
  }, [serverTodos, localTodos]);

  const addTodo = useCallback((newTodo: Omit<Todo, 'id'>) => {
    const todo: Todo = {
      ...newTodo,
      id: uuidv4(),
    };
    createTodoMutation.mutate(todo, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  }, [createTodoMutation]);

  const deleteTodo = useCallback((id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
      },
    });
  }, [deleteTodoMutation]);

  const editTodo = useCallback((updatedTodo: Todo) => {
    updateTodoMutation.mutate(updatedTodo, {
      onSuccess: () => {
      },
    });
  }, [updateTodoMutation]);

  const reorderTodo = useCallback((activeId: string, overId: string) => {
    setLocalTodos((currentTodos) => {
      const todosToReorder = currentTodos.length > 0 ? currentTodos : (serverTodos || []);
      const oldIndex = _.findIndex(todosToReorder, (todo) => todo.id === activeId);
      const newIndex = _.findIndex(todosToReorder, (todo) => todo.id === overId);
      return arrayMove(todosToReorder, oldIndex, newIndex);
    });
  }, [serverTodos]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading todos: {error.message}. Make sure the backend server is running.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        OstrideLabs Tasks list
      </Typography>
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} onReorder={reorderTodo} />
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        Add Todo
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TodoForm onSubmit={addTodo} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default App;
