import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Task } from './types'
import { TaskRow } from './Task'
import { useState } from 'react'
import Modal from 'react-modal'
import { TaskInput } from './TaskInput'

type TaskListProps = {
  name: string
  tasks: Task[] | undefined
  isLoading: boolean
}

const customStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '400px',
    opacity: '1',
  },
  overlay: {
    background: 'hsla(252, 18%, 22%, 0.5)',
  },
}

export const TaskList = ({ name, tasks, isLoading }: TaskListProps) => {
  const [IsModalOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between align-middle border-b-2 border-black py-2 pr-4 my-4">
        <h2 className="text-3xl">{name}</h2>
        <button onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon
            icon={faPlus}
            className="my-auto h-[24px]"
            style={{ color: 'hsl(var(--primary))' }}
          />
        </button>
        <Modal
          isOpen={IsModalOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <TaskInput boardName={name} close={() => setIsOpen(false)} />
        </Modal>
      </div>
      <div>
        <ul>
          {isLoading ? (
            <p>Recuperando tareas</p>
          ) : (
            tasks?.map((task: Task) => <TaskRow task={task} key={task.id} />)
          )}
        </ul>
      </div>
    </div>
  )
}
