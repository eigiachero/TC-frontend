import { Task } from './types'

export const TaskRow = ({ task }: { task: Task }) => {
  return (
    <li key={task.id} className="my-2">
      <h1 className="text-xl font-medium">{task.name}</h1>
      <p className="text-xl">{task.description}</p>
    </li>
  )
}
