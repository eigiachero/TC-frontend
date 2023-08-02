import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Task, TaskInput, Status } from './types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const StatusEnum = z.nativeEnum(Status)
type StatusEnum = z.infer<typeof StatusEnum>

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre de la tarea es requerido.' }),
  description: z
    .string()
    .min(1, { message: 'Porfavor ingrese la descripcion de la tarea.' }),
  status: StatusEnum,
})

type TaskFormProps = {
  data?: Task
  boardName: string
  close: () => void
}

export const TaskForm = ({ data, boardName, close }: TaskFormProps) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newTask: TaskInput) => {
      if (data === undefined)
        return axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask)

      return axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${data.id}`,
        newTask
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      close()
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      status: StatusEnum.parse(Status[boardName as keyof typeof Status]),
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="p-7">
        <h1 className="text-3xl mb-4">Crear una nueva tarea</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Nombre</FormLabel>
                <Input placeholder="Nombre de la Tarea" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Estado de la tarea</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TODO">Por hacer</SelectItem>
                    <SelectItem value="DOING">En progreso</SelectItem>
                    <SelectItem value="DONE">Hecho</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xl">Descripcion</Label>
                <Textarea
                  placeholder="Describa la tarea a realizar"
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button className="w-full" variant={'secondary'} onClick={close}>
              Cancelar
            </Button>
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid}
            >
              {data ? 'Editar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
