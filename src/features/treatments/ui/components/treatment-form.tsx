import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const treatmentFormSchema = z.object({
  name: z.string().min(3, 'Use at least 3 characters'),
  category: z.enum(['facial', 'body', 'hair-removal', 'hands-and-feet']),
  description: z.string().min(10, 'Tell a bit more'),
  durationMinutes: z.number().int().min(15, 'Minimum 15 minutes'),
  price: z.number().positive('Price must be greater than 0'),
})

export type TreatmentFormValues = z.infer<typeof treatmentFormSchema>

interface TreatmentFormProps {
  defaultValues?: TreatmentFormValues
  isSaving: boolean
  onSubmit: (values: TreatmentFormValues) => void
}

const inputClass = 'rounded-md border bg-background px-3 py-2 text-sm'

export function TreatmentForm({ defaultValues, isSaving, onSubmit }: TreatmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" className={inputClass} {...register('name')} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid gap-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select id="category" className={inputClass} {...register('category')}>
          <option value="facial">Facial</option>
          <option value="body">Body</option>
          <option value="hair-removal">Hair removal</option>
          <option value="hands-and-feet">Hands and feet</option>
        </select>
        {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
      </div>

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

      <Button type="submit" disabled={isSaving}>
        Save
      </Button>
    </form>
  )
}
