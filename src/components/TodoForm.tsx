import { useState, useEffect, useRef, useCallback } from 'react';
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

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    }
  }, [title, description, onSubmit]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1, mb: 2 }}>
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
      <Box display="flex" gap={1}>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update' : 'Add'} Todo
        </Button>
        {isEditing && onCancel && (
          <Button type="button" onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default TodoForm;
