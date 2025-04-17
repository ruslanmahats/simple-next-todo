import { NewTodo, Todo } from '@/types/todo'
import axios from 'axios'

const todosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const getToDos = async () => {
  const res = await todosApi.get<Todo[]>(`/todos?_limit=10`)
  return res.data
}

export const addToDo = async (todo: NewTodo): Promise<NewTodo> => {
  const res = await todosApi.post(`/todos`, todo)
  return res.data
}

export const deleteToDo = async (id: number) => {
  await todosApi.delete(`/todos/${id}`)
  return id
}
