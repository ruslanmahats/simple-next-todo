import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

export default function Home() {
  return (
    <main className="max-w-xl mx-auto my-0">
      <h1 className="text-4xl">📝 Todo App</h1>
      <ReactQueryProvider>
        <AddTodoForm />
        <TodoList />
      </ReactQueryProvider>
    </main>
  )
}
