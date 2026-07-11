'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReviewForm } from '@/components/review/ReviewForm'
import { ReviewsSection } from '@/components/review/ReviewsSection'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/store/cart'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { use } from 'react'
import { mockReviews } from '@/mock/reviews'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({
  params: paramsPromise,
}: ProductDetailPageProps) {
  const params = use(paramsPromise)
  return <ProductDetailContent slug={params.slug} />
}

function ProductDetailContent({ slug }: { slug: string }) {
  const { data: product, isLoading } = useProduct(slug)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCart((state) => state.addItem)

  if (isLoading) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary h-96 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-secondary rounded w-3/4" />
                <div className="h-6 bg-secondary rounded w-1/2" />
                <div className="h-32 bg-secondary rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`Added ${quantity} to cart`)
    setQuantity(1)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'
    )
  }

  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        {' / '}
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        {' / '}
        <span>{product.name}</span>
      </div>

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="relative bg-secondary rounded-lg overflow-hidden h-96 md:h-[500px]">
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded font-bold">
                  -{discountPercent}%
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary">
                      ₹{product.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    product.stock > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div>
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <p className="text-muted-foreground">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Instructions */}
            <div>
              <h3 className="font-semibold mb-2">Care Instructions</h3>
              <p className="text-sm text-muted-foreground">
                {product.careInstructions}
              </p>
            </div>

            {/* Attributes */}
            <div className="flex flex-wrap gap-2 text-sm">
              {product.difficulty && (
                <span className="px-3 py-1 bg-secondary rounded-full">
                  {product.difficulty}
                </span>
              )}
              {product.sunlight && (
                <span className="px-3 py-1 bg-secondary rounded-full">
                  {product.sunlight}
                </span>
              )}
              {product.wateringFrequency && (
                <span className="px-3 py-1 bg-secondary rounded-full">
                  {product.wateringFrequency}
                </span>
              )}
              {product.airPurifying && (
                <span className="px-3 py-1 bg-secondary rounded-full">
                  Air Purifying
                </span>
              )}
              {product.petFriendly && (
                <span className="px-3 py-1 bg-secondary rounded-full">
                  Pet Friendly
                </span>
              )}
            </div>

            {/* Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                      className="px-4 py-2 hover:bg-secondary transition"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-l border-r border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stock, quantity + 1)
                        )
                      }
                      className="px-4 py-2 hover:bg-secondary transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Max: {product.stock}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Review Form */}
        <ReviewForm productId={product.id} productName={product.name} />

        {/* Reviews Display */}
        <ReviewsSection
          reviews={mockReviews.filter((r) => r.productId === product.id)}
          productName={product.name}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
        />
      </section>

      <Footer />
    </div>
  )
}
