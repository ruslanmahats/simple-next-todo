import TodoList from '@/components/TodoList'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

export default function Home() {
  return (
    <main>
      <h1>📝 Todo App</h1>
      <ReactQueryProvider>
        <TodoList />
      </ReactQueryProvider>
    </main>
  )
}
