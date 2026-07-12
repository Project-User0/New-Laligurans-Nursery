'use client'

import { useState, Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts, useNewProducts, useBestsellerProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { SearchFilters } from '@/types'
import { ChevronDown, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ShopPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'newest',
    page: 1,
    limit: 12,
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: products, isLoading } = useProducts(filters)
  const { data: categories } = useCategories()

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop Plants</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of plants
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}
          >
            <div className="space-y-6 sticky top-20">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center justify-between">
                  Category
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories?.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.category === cat.name}
                        onChange={(e) =>
                          handleFilterChange({
                            category: e.target.checked ? cat.name : undefined,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Min: Rs. {filters.minPrice || 0}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.minPrice || 0}
                      onChange={(e) =>
                        handleFilterChange({ minPrice: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max: Rs. {filters.maxPrice || 10000}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.maxPrice || 10000}
                      onChange={(e) =>
                        handleFilterChange({ maxPrice: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="font-semibold mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.difficulty === level}
                        onChange={(e) =>
                          handleFilterChange({
                            difficulty: e.target.checked ? level : undefined,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sunlight Filter */}
              <div>
                <h3 className="font-semibold mb-3">Sunlight</h3>
                <div className="space-y-2">
                  {['Full Sun', 'Partial Sun', 'Partial Shade', 'Full Shade'].map((light) => (
                    <label key={light} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.sunlight === light}
                        onChange={(e) =>
                          handleFilterChange({
                            sunlight: e.target.checked ? light : undefined,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">{light}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Attributes */}
              <div>
                <h3 className="font-semibold mb-3">Attributes</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.airPurifying || false}
                      onChange={(e) =>
                        handleFilterChange({ airPurifying: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm">Air Purifying</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.petFriendly || false}
                      onChange={(e) =>
                        handleFilterChange({ petFriendly: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm">Pet Friendly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.isNew || false}
                      onChange={(e) =>
                        handleFilterChange({ isNew: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm">New Arrivals</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.isBestseller || false}
                      onChange={(e) =>
                        handleFilterChange({ isBestseller: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm">Bestsellers</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() =>
                  setFilters({ sortBy: 'newest', page: 1, limit: 12 })
                }
                className="w-full py-2 border border-border rounded-lg hover:bg-secondary transition"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6 pb-4 border-b border-border lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full lg:max-w-md">
                <label className="mb-2 block text-sm text-muted-foreground">Search plants</label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.query || ''}
                    onChange={(e) => handleFilterChange({ query: e.target.value })}
                    placeholder="Search by name, category, or care"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pl-10 text-sm"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔎</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  {products?.total ? (
                    <>
                      Showing {(filters.page! - 1) * 12 + 1}-
                      {Math.min(filters.page! * 12, products.total)} of {products.total}
                    </>
                  ) : (
                    'Loading...'
                  )}
                </div>

                <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={filters.sortBy || 'newest'}
                    onChange={(e) =>
                      handleFilterChange({
                        sortBy: e.target.value as any,
                      })
                    }
                    className="appearance-none bg-secondary border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition"
                  >
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-secondary rounded-lg h-72 animate-pulse"
                    />
                  ))}
              </div>
            ) : products?.products?.length ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                  {products.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>

                {/* Pagination */}
                {products.hasMore || filters.page! > 1 ? (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: Math.max(1, prev.page! - 1),
                        }))
                      }
                      disabled={!filters.page || filters.page === 1}
                      className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 hover:bg-secondary transition"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Page {filters.page}
                    </span>
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: prev.page! + 1,
                        }))
                      }
                      disabled={!products.hasMore}
                      className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 hover:bg-secondary transition"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found</p>
                <button
                  onClick={() =>
                    setFilters({ sortBy: 'newest', page: 1, limit: 12 })
                  }
                  className="text-primary hover:underline"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
