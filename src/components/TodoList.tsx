import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onReorder: (activeId: string, overId: string) => void;
}

function TodoList({ todos, onDelete, onEdit, onReorder }: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd({ active, over }:DragEndEvent) {

    if (active.id !== over!.id) {
      onReorder(active.id as string, over!.id as string);
    }
  }

  if (_.isEmpty(todos)) {
    return <Typography variant="body1" sx={{ textAlign: 'center', padding: 3, color: 'text.secondary' }}>ToDo list is Empty!</Typography>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {_.map(todos, (todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
