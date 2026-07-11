import { useQuery } from '@tanstack/react-query'
import { Product, SearchFilters, SearchResults } from '@/types'
import {
  mockProducts,
  getProductBySlug,
  searchProducts,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts,
} from '@/mock'

export function useProducts(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<SearchResults> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      let results = [...mockProducts]

      // Apply filters
      if (filters?.query) {
        results = searchProducts(filters.query)
      }

      if (filters?.category) {
        results = results.filter((p) => p.category === filters.category)
      }

      if (filters?.minPrice !== undefined) {
        results = results.filter((p) => p.price >= filters.minPrice!)
      }

      if (filters?.maxPrice !== undefined) {
        results = results.filter((p) => p.price <= filters.maxPrice!)
      }

      if (filters?.rating !== undefined) {
        results = results.filter((p) => p.rating >= filters.rating!)
      }

      if (filters?.difficulty) {
        results = results.filter((p) => p.difficulty === filters.difficulty)
      }

      if (filters?.sunlight) {
        results = results.filter((p) => p.sunlight === filters.sunlight)
      }

      if (filters?.inStock) {
        results = results.filter((p) => p.stock > 0)
      }

      if (filters?.airPurifying) {
        results = results.filter((p) => p.airPurifying)
      }

      if (filters?.petFriendly) {
        results = results.filter((p) => p.petFriendly)
      }

      if (filters?.isNew) {
        results = results.filter((p) => p.isNew)
      }

      if (filters?.isBestseller) {
        results = results.filter((p) => p.isBestseller)
      }

      // Apply sorting
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            results.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            break
          case 'popular':
            results.sort((a, b) => b.reviewCount - a.reviewCount)
            break
          case 'price-low':
            results.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
            break
          case 'price-high':
            results.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
            break
          case 'rating':
            results.sort((a, b) => b.rating - a.rating)
            break
        }
      }

      // Apply pagination
      const page = filters?.page || 1
      const limit = filters?.limit || 12
      const total = results.length
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedResults = results.slice(start, end)

      return {
        products: paginatedResults,
        total,
        page,
        limit,
        hasMore: end < total,
      }
    },
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return getProductBySlug(slug) || null
    },
    enabled: !!slug,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return getFeaturedProducts()
    },
  })
}

export function useBestsellerProducts() {
  return useQuery({
    queryKey: ['products', 'bestseller'],
    queryFn: async (): Promise<Product[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return getBestsellerProducts()
    },
  })
}

export function useNewProducts() {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: async (): Promise<Product[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return getNewProducts()
    },
  })
}
