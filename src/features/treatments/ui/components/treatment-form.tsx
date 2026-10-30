// zodResolver: conecta las reglas de zod con el formulario
import { zodResolver } from '@hookform/resolvers/zod'
// useForm: el hook que maneja el formulario (valores, errores, envío)
import { useForm } from 'react-hook-form'
// z: la librería zod, para escribir las reglas de validación
import { z } from 'zod'

import { Button } from '@/components/ui/button'

// ESQUEMA: las reglas que debe cumplir cada campo antes de guardar
// es como quien revisa que la ficha esté bien llena antes de archivarla
const treatmentFormSchema = z.object({
  // texto de mínimo 3 letras; si no, muestra ese mensaje
  name: z.string().min(3, 'Use at least 3 characters'),
  // solo una de estas 4 opciones (el mismo menú cerrado de TreatmentCategory)
  category: z.enum(['facial', 'body', 'hair-removal', 'hands-and-feet']),
  // texto de mínimo 10 letras
  description: z.string().min(10, 'Tell a bit more'),
  // número entero (int), mínimo 15 minutos
  durationMinutes: z.number().int().min(15, 'Minimum 15 minutes'),
  // número mayor que 0 (positive)
  price: z.number().positive('Price must be greater than 0'),
})

// z.infer crea el TIPO de TypeScript a partir de las reglas de zod
// así no hay que escribir la misma lista de campos dos veces
export type TreatmentFormValues = z.infer<typeof treatmentFormSchema>

// las props que recibe el formulario
interface TreatmentFormProps {
  // el "?" significa opcional: valores iniciales (se usan al EDITAR; al crear no se pasan)
  defaultValues?: TreatmentFormValues
  // si está guardando (para desactivar el botón)
  isSaving: boolean
  // qué hacer con los datos cuando son válidos (lo decide la página que usa el formulario)
  onSubmit: (values: TreatmentFormValues) => void
}

// clases de Tailwind que comparten todos los campos, guardadas una sola vez
const inputClass = 'rounded-md border bg-background px-3 py-2 text-sm'

// COMPONENTE: el formulario reutilizable (sirve para crear y, más adelante, para editar)
export function TreatmentForm({ defaultValues, isSaving, onSubmit }: TreatmentFormProps) {
  // useForm entrega:
  // register = conecta cada campo con el formulario
  // handleSubmit = revisa las reglas antes de llamar a onSubmit
  // errors = los mensajes de los campos que no cumplen las reglas
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreatmentFormValues>({
    // usa las reglas de zod para validar
    resolver: zodResolver(treatmentFormSchema),
    defaultValues,
  })

  return (
    // al enviar: handleSubmit valida; solo si todo está bien llama a onSubmit
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-4">
      {/* CAMPO: nombre */}
      <div className="grid gap-2">
        {/* htmlFor une la etiqueta con el campo que tiene ese id */}
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        {/* {...register('name')} conecta este input con el campo "name" del formulario */}
        <input id="name" className={inputClass} {...register('name')} />
        {/* "&&" = si hay error en name, entonces muestra su mensaje en rojo */}
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* CAMPO: categoría (lista desplegable con las 4 opciones) */}
      <div className="grid gap-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select id="category" className={inputClass} {...register('category')}>
          {/* value = lo que se guarda; el texto de adentro = lo que ve la persona */}
          <option value="facial">Facial</option>
          <option value="body">Body</option>
          <option value="hair-removal">Hair removal</option>
          <option value="hands-and-feet">Hands and feet</option>
        </select>
        {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
      </div>

      {/* CAMPO: descripción (textarea = caja de texto de varias líneas) */}
      <div className="grid gap-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea id="description" rows={3} className={inputClass} {...register('description')} />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* numbers need valueAsNumber */}
      {/* los inputs siempre entregan TEXTO ("60"); valueAsNumber lo convierte en número (60) */}
      {/* sin eso, zod diría que no es un número */}
      <div className="grid gap-2">
        <label htmlFor="durationMinutes" className="text-sm font-medium">
          Duration (minutes)
        </label>
        <input
          id="durationMinutes"
          type="number"
          className={inputClass}
          {...register('durationMinutes', { valueAsNumber: true })}
        />
        {errors.durationMinutes && (
          <p className="text-sm text-destructive">{errors.durationMinutes.message}</p>
        )}
      </div>

      {/* CAMPO: precio (también número) */}
      <div className="grid gap-2">
        <label htmlFor="price" className="text-sm font-medium">
          Price
        </label>
        <input
          id="price"
          type="number"
          className={inputClass}
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
      </div>

      {/* type="submit" envía el formulario; disabled lo desactiva mientras guarda */}
      <Button type="submit" disabled={isSaving}>
        Save
      </Button>
    </form>
  )
}
