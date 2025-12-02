import { Router, Request, Response } from 'express';
import knex from './knex';

interface TodoPayload {
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

interface TodoRow {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const router = Router()
  .get('/', async (_req: Request, res: Response<TodoRow[]>) => {
  try {
    const rows = await knex<TodoRow>('todos').orderBy('created_at', 'desc');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json([]);
  }
})
  .get('/:id', async (req: Request<{ id: string }>, res: Response<TodoRow | { error: string }>) => {
  try {
    const { id } = req.params;
    const [todo] = await knex<TodoRow>('todos').where('id', id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
})
  .post('/', async (req: Request<Record<string, never>, TodoRow, TodoPayload>, res: Response<TodoRow | { error: string }>) => {
  try {
    const { id, title, description, completed } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: 'ID and title are required' });
    }

    const [created] = await knex<TodoRow>('todos')
      .insert({ id, title, description: description ?? '', completed: completed ?? false })
      .returning('*');

    return res.status(201).json(created);
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({ error: 'Failed to create todo' });
  }
})
  .put('/:id', async (req: Request<{ id: string }, TodoRow, TodoPayload>, res: Response<TodoRow | { error: string }>) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const updateData: Partial<TodoRow> = {
      title,
      description: description ?? '',
      updated_at: knex.fn.now() as any
    };

    if (completed !== undefined) {
      updateData.completed = completed;
    }

    const [updated] = await knex<TodoRow>('todos')
      .where('id', id)
      .update(updateData)
      .returning('*');

    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ error: 'Failed to update todo' });
  }
})
  .patch('/:id/toggle', async (req: Request<{ id: string }>, res: Response<TodoRow | { error: string }>) => {
  try {
    const { id } = req.params;

    // Get current todo
    const [currentTodo] = await knex<TodoRow>('todos').where('id', id);

    if (!currentTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Toggle the completed status
    const [updated] = await knex<TodoRow>('todos')
      .where('id', id)
      .update({ completed: !currentTodo.completed, updated_at: knex.fn.now() })
      .returning('*');

    return res.json(updated);
  } catch (error) {
    console.error('Error toggling todo status:', error);
    return res.status(500).json({ error: 'Failed to toggle todo status' });
  }
})
  .delete('/:id', async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
  try {
    const { id } = req.params;
    const [deleted] = await knex<TodoRow>('todos').where('id', id).del().returning('*');

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
