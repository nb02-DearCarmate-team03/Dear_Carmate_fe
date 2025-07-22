import { getCarsForContract } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

const useCarsForContract = () => {
  const query = useQuery({
    queryKey: ['carsForContract'],
    queryFn: async () => await getCarsForContract(),
    throwOnError: true,
  })

  return query
}

export default useCarsForContract
