import { Todo } from '@/types/todo'

type ToDo = {
  todo: Todo
  isDeleting: boolean
  isError: boolean
  onDelete: () => void
}

export default function ToDo({ todo, onDelete, isDeleting, isError }: ToDo) {
  return (
    <li>
      {todo.title}
      <button onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? '⏳' : '🗑️'}
      </button>
      {isError ? <p>❌ Sorry, something went wrong. Try again!</p> : null}
    </li>
  )
}
