import { Input } from '@/components/ui/input'
import { Task } from './types'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type TaskInputProps = {
  data: Task | undefined
  boardName: string
  close: () => void
}

export const TaskInput = ({ data, boardName, close }: TaskInputProps) => {
  return (
    <div className="p-7">
      <h1 className="text-3xl mb-4">Crear una nueva tarea</h1>
      <form className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name" className="text-xl">
            Nombre
          </Label>
          <Input type="name" id="name" placeholder="Nombre de la Tarea" />
        </div>
        <div>
          <Label htmlFor="description" className="text-xl">
            Descripcion
          </Label>
          <Textarea placeholder="Describa la tarea a realizar" />
        </div>

        <div className="flex gap-2">
          <Button className="w-full" variant={'secondary'}>
            Cancelar
          </Button>
          <Button className="w-full">Crear</Button>
        </div>
      </form>
    </div>
  )
}
