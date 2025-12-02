import { useState, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import type { Todo } from './types/Todo';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { arrayMove } from '@dnd-kit/sortable';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addTodo = useCallback((newTodo: Omit<Todo, 'id'>) => {
    const todo: Todo = {
      ...newTodo,
      id: uuidv4(),
    };
    setTodos(_.concat([todo], todos));
    setDialogOpen(false);
  }, [todos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(_.filter(todos, (todo) => todo.id !== id));
  }, [todos]);

  const editTodo = useCallback((updatedTodo: Todo) => {
    setTodos(_.map(todos, (todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  }, [todos]);

  const reorderTodo = useCallback((activeId: string, overId: string) => {
    setTodos((todos) => {
      const oldIndex = _.findIndex(todos, (todo) => todo.id === activeId);
      const newIndex = _.findIndex(todos, (todo) => todo.id === overId);
      return arrayMove(todos, oldIndex, newIndex);
    });
  }, []);

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
