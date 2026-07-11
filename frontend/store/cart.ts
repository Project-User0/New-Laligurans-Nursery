import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product } from '@/types'
import { STORAGE_KEYS } from '@/lib/constants'

interface CartStore extends Cart {
  addItem: (product: Product, quantity: number) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  calculateTotals: () => void
}

const calculateCartTotals = (items: CartItem[], discount: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.13) // 13% tax
  const shipping = subtotal > 2000 ? 0 : 150 // Free shipping over 2000
  const total = subtotal + tax + shipping - discount

  return { subtotal, tax, shipping, total }
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      appliedCoupon: undefined,

      addItem: (product: Product, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === product.id)

          let newItems: CartItem[]
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.productId === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          } else {
            const newItem: CartItem = {
              id: `cart-${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              price: product.discountPrice || product.price,
              addedAt: new Date().toISOString(),
            }
            newItems = [...state.items, newItem]
          }

          const totals = calculateCartTotals(newItems, state.discount)
          return {
            items: newItems,
            ...totals,
          }
        })
      },

      removeItem: (cartItemId: string) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== cartItemId)
          const totals = calculateCartTotals(newItems, state.discount)
          return {
            items: newItems,
            ...totals,
          }
        })
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return state
          }

          const newItems = state.items.map((i) =>
            i.id === cartItemId ? { ...i, quantity } : i
          )
          const totals = calculateCartTotals(newItems, state.discount)
          return {
            items: newItems,
            ...totals,
          }
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          appliedCoupon: undefined,
        })
      },

      applyCoupon: (code: string, discount: number) => {
        set((state) => {
          const totals = calculateCartTotals(state.items, discount)
          return {
            discount,
            appliedCoupon: code,
            ...totals,
          }
        })
      },

      removeCoupon: () => {
        set((state) => {
          const totals = calculateCartTotals(state.items, 0)
          return {
            discount: 0,
            appliedCoupon: undefined,
            ...totals,
          }
        })
      },

      calculateTotals: () => {
        set((state) => {
          const totals = calculateCartTotals(state.items, state.discount)
          return totals
        })
      },
    }),
    {
      name: STORAGE_KEYS.CART,
    }
  )
)
