import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TaskList } from './TaskList'
import { Task } from './types'

function App() {
  const { data, error, isFetching } = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const { data } = await axios.get('http://localhost:4000/tasks')
      return data
    },
  })

  return (
    <div className="min-h-screen bg-background antialiased">
      <header className="flex place-content-center p-8">
        <h1 className="text-5xl font-bold">Tablero de tareas</h1>
      </header>
      <main className="p-12">
        {error instanceof Error && (
          <h1>Ocurrio un error inesperado: {error.message}</h1>
        )}
        <TaskList
          name="Por hacer"
          tasks={data?.filter((t) => t.status == 'TODO')}
          isLoading={isFetching}
        />
        <TaskList
          name="En progreso"
          tasks={data?.filter((t) => t.status == 'DOING')}
          isLoading={isFetching}
        />
        <TaskList
          name="Hecho"
          tasks={data?.filter((t) => t.status == 'DONE')}
          isLoading={isFetching}
        />
      </main>
    </div>
  )
}

export default App
