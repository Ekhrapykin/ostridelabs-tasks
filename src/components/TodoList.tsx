import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

function TodoList({ todos, onDelete, onEdit }: TodoListProps) {
  if (_.isEmpty(todos)) {
    return <Typography variant="body1" sx={{ textAlign: 'center', padding: 3, color: 'text.secondary' }}>ToDo list is Empty!</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {_.map(todos, (todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </Box>
  );
}

export default TodoList;
