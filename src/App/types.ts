export type Task = {
  id: number
  name: string
  description: string
  status: Status
  createdAt: string
  updatedAt: string
}

export type TaskInput = {
  name: string
  description: string
  status: Status
}

export enum Status {
  'Por hacer' = 'TODO',
  'En progreso' = 'DOING',
  Hecho = 'DONE',
}
