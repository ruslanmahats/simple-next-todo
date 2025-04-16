import { Todo } from '@/types/todo'
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com'

export const getToDos = async () => {
  const res = await axios.get<Todo[]>(`${API_URL}/todos?_limit=10`)
  return res.data
}

export const deleteToDo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`)
  return id
}
