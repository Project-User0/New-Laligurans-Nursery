import { useQuery } from '@tanstack/react-query'
import { useWishlist } from '@/store/wishlist'
import { getProductById } from '@/mock/products'
import { Product } from '@/types'

export function useWishlistProducts() {
  const wishlistItems = useWishlist((state) => state.items)

  return useQuery({
    queryKey: ['wishlist-products', wishlistItems.map((i) => i.productId).join(',')],
    queryFn: async (): Promise<Product[]> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 100))

      const products = wishlistItems
        .map((item) => getProductById(item.productId))
        .filter((product): product is Product => product !== undefined)

      return products
    },
    enabled: wishlistItems.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
