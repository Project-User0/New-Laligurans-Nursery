import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WishlistItem } from '@/types'
import { STORAGE_KEYS } from '@/lib/constants'

interface WishlistStore {
  items: WishlistItem[]
  addItem: (productId: number) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number) => {
        set((state) => {
          const exists = state.items.some((i) => i.productId === productId)
          if (exists) return state

          const newItem: WishlistItem = {
            id: `wishlist-${productId}-${Date.now()}`,
            userId: 'current-user', // Mock userId
            productId,
            addedAt: new Date().toISOString(),
          }

          return {
            items: [...state.items, newItem],
          }
        })
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      isInWishlist: (productId: number) => {
        return get().items.some((i) => i.productId === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: STORAGE_KEYS.WISHLIST,
    }
  )
)
