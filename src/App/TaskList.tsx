import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Task } from './types'
import { TaskRow } from './Task'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { TaskForm } from './TaskForm'
import ReactModal from 'react-modal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type TaskListProps = {
  name: string
  tasks: Task[] | undefined
  isLoading: boolean
}

ReactModal.setAppElement('#root')

export const TaskList = ({ name, tasks }: TaskListProps) => {
  const [IsModalOpen, setIsOpen] = useState(false)
  const [orderBy, setOrderBy] = useState('date-desc')
  const [orderedTasks, setOrderedTasks] = useState<Task[]>([])

  useEffect(() => {
    if (tasks === undefined) return
    const [by, asc] = orderBy.split('-')

    const ordered =
      by == 'name'
        ? Array.from(tasks).sort((t1, t2) => t1.name.localeCompare(t2.name))
        : Array.from(tasks).sort(
            (t1, t2) =>
              new Date(t1.createdAt).valueOf() -
              new Date(t2.createdAt).valueOf()
          )

    if (asc == 'up') ordered.reverse()

    setOrderedTasks(ordered)
  }, [tasks, orderBy])

  return (
    <div>
      <div className="flex justify-between align-middle border-b-2 border-black py-2 pr-4 my-4">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex flex-row-reverse gap-2">
          <button onClick={() => setIsOpen(true)}>
            <FontAwesomeIcon
              icon={faPlus}
              className="my-auto h-[24px]"
              style={{ color: 'hsl(var(--primary))' }}
            />
          </button>

          <Select
            defaultValue="date-desc"
            value={orderBy}
            onValueChange={(value) => setOrderBy(value)}
          >
            <SelectTrigger className="w-[180px] bg-slate-50">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-desc">Nombre ↓ </SelectItem>
              <SelectItem value="name-up">Nombre ↑ </SelectItem>
              <SelectItem value="date-desc">Fecha ↓ </SelectItem>
              <SelectItem value="date-up">Fecha ↑ </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Modal
          isOpen={IsModalOpen}
          onRequestClose={() => setIsOpen(false)}
          overlayClassName="Overlay"
          className="Modal"
        >
          <TaskForm boardName={name} close={() => setIsOpen(false)} />
        </Modal>
      </div>
      <div>
        <ul>
          {orderedTasks?.map((task: Task) => (
            <TaskRow task={task} boardName={name} key={task.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}
