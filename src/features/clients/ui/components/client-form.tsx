import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

// reglas que deben cumplir los datos del formulario //
const clientFormSchema = z.object({
  // obligatorio, minimo 3 letras //
  fullName: z.string().min(3, 'Escribe el nombre completo'),
  // celular colombiano: empieza por 3 y tiene 10 numeros //
  phone: z.string().regex(/^3\d{9}$/, 'Debe ser un celular de 10 dígitos que empiece por 3'),
  // opcional, pero si lo escriben debe ser un correo valido //
  email: z.email('Escribe un correo válido').optional().or(z.literal('')),
  // solo uno de los 5 tipos de piel //
  skinType: z.enum(['normal', 'dry', 'oily', 'combination', 'sensitive']),
  // lista de alertas, puede estar vacia //
  alerts: z.array(
    z.enum([
      'pregnancy',
      'lactation',
      'active-acne',
      'rosacea',
      'recent-sun-exposure',
      'skin-allergy',
    ]),
  ),
  // opcional //
  notes: z.string().optional(),
})

// el molde de los datos del formulario, sacado de las reglas //
export type ClientFormValues = z.infer<typeof clientFormSchema>
// lo que recibe el formulario //
interface ClientFormProps {
  // datos para empezar lleno, solo cuando se edita //
  defaultValues?: ClientFormValues
  // si esta guardando, para desactivar el boton //
  isSaving: boolean
  // que hacer cuando los datos estan bien //
  onSubmit: (values: ClientFormValues) => void
}
export function ClientForm({ defaultValues, isSaving, onSubmit }: ClientFormProps) {
  // la recepcionista, con las reglas de zod //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    // empieza sin alertas //
    defaultValues: defaultValues ?? { alerts: [] },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-4">
      {' '}
      {/* casilla del nombre */}
      <label htmlFor="fullName">Nombre completo</label>
      <input id="fullName" className="rounded-md border px-3 py-2" {...register('fullName')} />
      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      {/* casilla del telefono */}
      <label htmlFor="phone">Teléfono</label>
      <input id="phone" type="tel" className="rounded-md border px-3 py-2" {...register('phone')} />
      {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      {/* casilla del correo, opcional */}
      <label htmlFor="email">correo electrónico (opcional)</label>
      <input
        id="email"
        type="email"
        className="rounded-md border px-3 py-2"
        {...register('email')}
      />
      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      {/* tipo de piel: menu desplegable */}
      <label htmlFor="skinType">Tipo de piel</label>
      <select id="skinType" className="rounded-md border px-3 py-2" {...register('skinType')}>
        <option value="normal">Normal</option>
        <option value="dry">Seca</option>
        <option value="oily">Grasa</option>
        <option value="combination">Mixta</option>
        <option value="sensitive">Sensible</option>
      </select>
      {/* alertas: varias casillas con el mismo nombre forman una lista */}
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">
          Marca las condiciones que presenta la clienta:
        </legend>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="pregnancy" {...register('alerts')} />
          Embarazo
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="lactation" {...register('alerts')} />
          Lactancia
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="active-acne" {...register('alerts')} />
          Acné activo
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="rosacea" {...register('alerts')} />
          Rosácea
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="recent-sun-exposure" {...register('alerts')} />
          Exposición reciente al sol
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" value="skin-allergy" {...register('alerts')} />
          Alergia en la piel
        </label>
      </fieldset>
      {/* casilla de notas, opcional */}
      <label htmlFor="notes">Notas (opcional)</label>
      <textarea
        id="notes"
        rows={3}
        className="rounded-md border px-3 py-2"
        {...register('notes')}
      />
      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
