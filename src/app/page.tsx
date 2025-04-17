import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

export default function Home() {
  return (
    <main className="max-w-xl mx-auto my-0 p-4 ">
      <h1 className="text-4xl">📝Simple ToDo App</h1>
      <ReactQueryProvider>
        <AddTodoForm />
        <TodoList />
      </ReactQueryProvider>
    </main>
  )
}
