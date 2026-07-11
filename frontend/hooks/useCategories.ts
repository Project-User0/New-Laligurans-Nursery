import { useQuery } from '@tanstack/react-query'
import { Category } from '@/types'
import { mockCategories, getFeaturedCategories } from '@/mock'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return mockCategories
    },
  })
}

export function useFeaturedCategories() {
  return useQuery({
    queryKey: ['categories', 'featured'],
    queryFn: async (): Promise<Category[]> => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return getFeaturedCategories()
    },
  })
}
