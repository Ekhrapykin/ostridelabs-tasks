import { useState, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import type { Todo } from './types/Todo';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Container, Typography } from '@mui/material';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((newTodo: Omit<Todo, 'id'>) => {
    const todo: Todo = {
      ...newTodo,
      id: uuidv4(),
    };
    setTodos(_.concat([todo], todos));
  }, [todos]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        OstrideLabs Tasks list
      </Typography>
      <TodoForm onSubmit={addTodo} />
    </Container>
  );
}

export default App;
