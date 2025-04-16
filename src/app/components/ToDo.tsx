import { Todo } from '@/types/todo'

type ToDo = {
  todo: Todo
  isDeleting: boolean
  onDelete: (id: number) => void
  isError: boolean
}

export default function ToDo({ todo, onDelete, isDeleting, isError }: ToDo) {
  return (
    <li>
      {todo.title}
      <button onClick={() => onDelete(todo.id)} disabled={isDeleting}>
        {isDeleting ? '⏳' : '🗑️'}
      </button>
      {isError ? <p>❌ Sorry, something went wrong. Try again!</p> : null}
    </li>
  )
}
