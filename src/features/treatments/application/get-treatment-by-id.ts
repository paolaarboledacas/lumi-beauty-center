// application/get-treatment-by-id.ts
export function getTreatmentById(repository: TreatmentRepository, id: string) {
  return repository.findById(id)
}

// ui/hooks/use-treatment.ts
export function useTreatment(id: string) {
  return useQuery({
    queryKey: ['treatments', id],
    queryFn: () => getTreatmentById(treatmentRepository, id),
  })
}