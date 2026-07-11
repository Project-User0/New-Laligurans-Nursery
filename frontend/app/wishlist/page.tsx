'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/product/ProductCard'
import { useWishlistProducts } from '@/hooks/useWishlistProducts'
import { useWishlist } from '@/store/wishlist'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { data: products, isLoading } = useWishlistProducts()
  const { items, removeItem, clearWishlist } = useWishlist()

  const handleRemoveItem = (productId: number) => {
    removeItem(productId)
    toast.success('Removed from wishlist')
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success('Wishlist cleared')
  }

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Wishlist</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Add plants to your wishlist to save them for later. When you&apos;re
              ready, checkout all your favorite plants together.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-secondary rounded-lg h-64 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Wishlist Items */}
        {items.length > 0 && !isLoading && products && (
          <div className="space-y-8">
            {/* Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group"
                >
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemoveItem(product.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-destructive text-white p-2 rounded-lg z-10"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to buy?
                  </h3>
                  <p className="text-muted-foreground">
                    Add items to your cart and proceed to checkout
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition whitespace-nowrap"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
