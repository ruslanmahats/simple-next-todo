import { Todo } from '@/types/todo'

type ToDo = {
  todo: Todo
  isDeleting: boolean
  isError: boolean
  onDelete: () => void
}

export default function ToDo({ todo, onDelete, isDeleting, isError }: ToDo) {
  return (
    <li className="p-3 border-x border-b border-gray-400 first:border-t hover:bg-gray-200">
      <div className="flex justify-between items-center gap-1.5 ">
        <span>{todo.title}</span>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="cursor-pointer p-2 border border-gray-400 hover:bg-gray-400 transition"
        >
          {isDeleting ? '⏳' : '🗑️'}
        </button>
      </div>
      {isError ? (
        <p className="text-xs text-red-500 mt-1">
          ❌ Sorry, something went wrong. Try again!
        </p>
      ) : null}
    </li>
  )
}
