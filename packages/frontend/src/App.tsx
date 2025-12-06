import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, CircularProgress, Alert } from '@mui/material';
import { useTodoOperations } from './hooks/useTodoOperations';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { todos, isLoading, error, addTodo, deleteTodo, editTodo, reorderTodo } = useTodoOperations();

  const handleAddTodo = async (newTodo: Parameters<typeof addTodo>[0]) => {
    await addTodo(newTodo);
    setDialogOpen(false);
  };

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
          <TodoForm onSubmit={handleAddTodo} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default App;
