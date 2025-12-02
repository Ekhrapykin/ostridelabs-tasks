import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todosApi } from '../api/todos';

export const TODOS_QUERY_KEY = ['todos'];
const invalidateTodosQuery = (queryClient: ReturnType<typeof useQueryClient>) => () =>
  queryClient.invalidateQueries({queryKey: TODOS_QUERY_KEY})

export const useTodos = () =>
  useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: todosApi.get,
  });

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.post,
    onSuccess: invalidateTodosQuery(queryClient)
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.put,
    onSuccess: invalidateTodosQuery(queryClient),
  });
};

export const useToggleTodoCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.toggleCompleted,
    onSuccess: invalidateTodosQuery(queryClient)
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.delete,
    onSuccess: invalidateTodosQuery(queryClient)
  });
};

