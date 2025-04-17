'use client'

import { NewTodo, Todo } from '@/types/todo'
import { addToDo } from '@/utils/todosApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

export default function AddTodoForm() {
  const [empty, setEmpty] = useState(false)
  const [formData, setFormData] = useState<NewTodo>({
    completed: false,
    title: '',
  })

  const queryClient = useQueryClient()

  const { mutate, error, isPending } = useMutation({
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
    if (!formData.title) {
      setEmpty(true)
      return
    }
    mutate(formData)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmpty(false)
    setFormData((prev) => ({ ...prev, title: e.target.value }))
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" px-3 py-5 border-1 border-gray-400 mt-8 mb-8"
    >
      <div className="flex justify-between gap-1.5">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="new-todo"
          value={formData.title}
          placeholder="add new todo"
          className={`w-full p-2 border-1 border-gray-400 ${empty && 'border-red-500'}`}
        />
        <button
          type="submit"
          className="cursor-pointer p-2 border-1 border-gray-400 hover:bg-gray-400 transition"
        >
          {isPending ? '⏳' : '➕'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{`Something went wrong: ${error.message}`}</p>
      )}
    </form>
  )
}
