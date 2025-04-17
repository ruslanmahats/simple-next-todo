'use client'

import { NewTodo, Todo } from '@/types/todo'
import { addToDo } from '@/utils/todosApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

export default function AddTodoForm() {
  const [formData, setFormData] = useState<NewTodo>({
    completed: false,
    title: '',
  })

  const queryClient = useQueryClient()

  const { mutate, error } = useMutation({
    mutationFn: addToDo,
    onSuccess: (newTodo) => {
      const addTodo: Todo = { ...newTodo, id: Date.now() }
      queryClient.setQueryData<Todo[]>(['todos'], (oldToDos) =>
        oldToDos ? [...oldToDos, addTodo] : [addTodo]
      )
      setFormData((prev) => ({ ...prev, title: '' }))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }))
  }

  return (
    <div className="container">
      <h2>AddTodo</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && <p>{error.message}</p>}
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="new-todo"
          value={formData.title}
          placeholder="add new todo"
        />
        <button type="submit">➕</button>
      </form>
    </div>
  )
}
