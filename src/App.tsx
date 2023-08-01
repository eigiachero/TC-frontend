import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

function App() {
  const { data, status, error, isFetching } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
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
        <div>
          <div className="flex justify-between align-middle border-b-2 border-black py-2 pr-4 my-4">
            <h2 className="text-3xl">Por hacer</h2>
            <button>
              <FontAwesomeIcon
                icon={faPlus}
                className="my-auto h-[24px]"
                style={{ color: 'hsl(var(--primary))' }}
              />
            </button>
          </div>
          <div>
            {isFetching && <p>Recuperando tareas</p>}
            {status == 'error' && <p>Ocurrio un error: {error.message}</p>}
            <ul>
              {data &&
                data.map((task: Task) => (
                  <li key={task.id} className="my-2">
                    <h1 className="text-xl font-medium">{task.name}</h1>
                    <p className="text-xl">{task.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

type Task = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export default App
