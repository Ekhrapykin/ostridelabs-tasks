import { useState, useCallback } from 'react';
import type { Todo } from '../types/Todo';
import TodoForm from './TodoForm';
import { Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, Checkbox } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useToggleTodoCompleted } from '../hooks/useTodosQuery';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

function TodoItem({ todo, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleCompletedMutation = useToggleTodoCompleted();

  const handleEdit = useCallback(
    (updatedTodo: Omit<Todo, 'id'>) => {
      onEdit({ ...updatedTodo, id: todo.id });
      setIsEditing(false);
    },
    [onEdit, todo.id]
  );

  const handleToggleCompleted = useCallback(() => {
    toggleCompletedMutation.mutate(todo.id);
  }, [toggleCompletedMutation, todo.id]);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} sx={{ mb: 1 }} {...attributes}>
      <Box display="flex" alignItems="stretch">
        <Box
          {...listeners}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'grab',
            px: 1,
            bgcolor: 'action.hover',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <DragIndicatorIcon />
        </Box>
        <Box flex={1}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={todo.completed}
                onChange={handleToggleCompleted}
                color="primary"
              />
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.title}
              </Typography>
            </Box>
            {todo.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  ml: 5,
                }}
              >
                {todo.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 5 }}>
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
        </Box>
      </Box>
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TodoForm
            onSubmit={handleEdit}
            initialData={todo}
            onCancel={() => setIsEditing(false)}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default TodoItem;
