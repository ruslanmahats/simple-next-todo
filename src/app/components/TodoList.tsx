'use client'

import ToDo from '@/components/ToDo'
import { Todo } from '@/types/todo'
import { deleteToDo, getToDos } from '@/utils/todosApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function TodoList() {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [errorId, setErrorId] = useState<number | null>(null)

  const queryClient = useQueryClient()

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getToDos,
    select: (todos) => [...todos].sort((a, b) => b.id - a.id),
  })

  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteToDo,
    onMutate: (id) => {
      setErrorId(null)
      setDeletingId(id)
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldToDos) =>
        oldToDos ? oldToDos.filter((todo) => todo.id !== deletedId) : []
      )
    },
    onSettled: () => {
      setDeletingId(null)
    },
    onError: (_, id) => {
      setErrorId(id)
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading todos: {error.message}</p>

  return (
    <ul>
      {todos?.map((todo) => (
        <ToDo
          key={todo.id}
          todo={todo}
          onDelete={() => deleteTodo(todo.id)}
          isDeleting={deletingId === todo.id}
          isError={errorId === todo.id}
        />
      ))}
    </ul>
  )
}
