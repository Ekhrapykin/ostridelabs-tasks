 import { useState, useCallback } from 'react';
import type { Todo } from '../types/Todo';
import * as React from "react";
import { TextField, Button, Box } from '@mui/material';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  initialData?: Todo;
  onCancel?: () => void;
  isEditing?: boolean;
}

function TodoForm({ onSubmit, initialData, onCancel, isEditing = false }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        completed: initialData?.completed ?? false
      });
      if (!isEditing) {
        setTitle('');
        setDescription('');
      }
    }
  }, [title, description, onSubmit, initialData?.completed, isEditing]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderRadius: 1 }}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
        {isEditing ? 'Update' : 'Add'} Todo
      </Button>
      <Button type="button" onClick={onCancel} variant="outlined" color="secondary">
        Cancel
      </Button>
    </Box>
  );
}

export default TodoForm;
