import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Task } from './types'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import Modal from 'react-modal'
import { TaskForm } from './TaskForm'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const TaskRow = ({
  task,
  boardName,
}: {
  task: Task
  boardName: string
}) => {
  const [IsModalOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:4000/tasks/${task.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return (
    <li key={task.id} className="flex my-2 justify-between">
      <div>
        <div className="flex gap-4">
          <h1 className="text-xl font-medium">{task.name}</h1>
          <p className="text-s font-light my-auto text-slate-500">
            {task.createdAt} {new Date(task.createdAt).valueOf()}
          </p>
        </div>
        <p className="text-xl">{task.description}</p>
        <Modal
          isOpen={IsModalOpen}
          onRequestClose={() => setIsOpen(false)}
          overlayClassName="Overlay"
          className="Modal"
        >
          <TaskForm
            data={task}
            boardName={boardName}
            close={() => setIsOpen(false)}
          />
        </Modal>
      </div>
      <div className="flex gap-4 mr-8">
        <button onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="my-auto h-[24px]"
            style={{ color: 'hsl(var(--primary))' }}
          />
        </button>
        <button onClick={() => mutation.mutate()}>
          <FontAwesomeIcon
            icon={faTrash}
            className="my-auto h-[24px]"
            style={{ color: '#dc2626' }}
          />
        </button>
      </div>
    </li>
  )
}
