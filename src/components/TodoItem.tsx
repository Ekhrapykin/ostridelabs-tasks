import { useState, useCallback } from 'react';
import type { Todo } from '../types/Todo';
import TodoForm from './TodoForm';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

function TodoItem({ todo, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(
    (updatedTodo: Omit<Todo, 'id'>) => {
      onEdit({ ...updatedTodo, id: todo.id });
      setIsEditing(false);
    },
    [onEdit, todo.id]
  );

  if (isEditing) {
    return (
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <TodoForm
            onSubmit={handleEdit}
            initialData={todo}
            onCancel={() => setIsEditing(false)}
            isEditing={true}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" component="h3">
          {todo.title}
        </Typography>
        {todo.description && (
          <Typography variant="body2" color="text.secondary">
            {todo.description}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          ID: {todo.id}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={1}>
        <Button
          onClick={() => setIsEditing(true)}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="outlined"
          color="error"
          sx={{ ml: 1 }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}

export default TodoItem;
