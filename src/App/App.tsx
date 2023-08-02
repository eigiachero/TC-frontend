import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TaskList } from './TaskList'
import { Task } from './types'
import { Input } from '@/components/ui/input'
import { useDebouncedState } from '@mantine/hooks'
import { useEffect, useState } from 'react'

function App() {
  const [value, setValue] = useDebouncedState('', 50)
  const [taskList, setTaskList] = useState<Task[]>([])
  const { data, error, isFetching } = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const { data } = await axios.get('http://localhost:4000/tasks')
      return data
    },
  })

  useEffect(() => {
    if (data === undefined) return
    setTaskList(data)
  }, [data])

  useEffect(() => {
    if (value === '' && data) {
      setTaskList(data)
    } else {
      setTaskList(
        taskList.filter((task) =>
          task.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      )
    }
  }, [taskList, value, data])

  return (
    <div className="min-h-screen bg-background antialiased">
      <header className="flex flex-col justify-center m-auto p-8 w-[600px] gap-6">
        <h1 className="text-5xl font-bold mx-auto">Tablero de tareas</h1>
        <Input
          className="outline bg-slate-50"
          placeholder="Buscar la tarea por nombre"
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </header>
      <main className="px-8 mb-16">
        {error instanceof Error && (
          <h1>Ocurrio un error inesperado: {error.message}</h1>
        )}
        <TaskList
          name="Por hacer"
          tasks={taskList?.filter((t) => t.status == 'TODO')}
          isLoading={isFetching}
        />
        <TaskList
          name="En progreso"
          tasks={taskList?.filter((t) => t.status == 'DOING')}
          isLoading={isFetching}
        />
        <TaskList
          name="Hecho"
          tasks={taskList?.filter((t) => t.status == 'DONE')}
          isLoading={isFetching}
        />
      </main>
    </div>
  )
}

export default App
