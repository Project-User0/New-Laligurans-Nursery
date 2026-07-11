'use client'

import { Review } from '@/types'
import { ReviewCard } from './ReviewCard'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface ReviewsSectionProps {
  reviews: Review[]
  productName: string
  averageRating?: number
  totalReviews?: number
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'most-helpful'
type FilterRating = 'all' | '5' | '4' | '3' | '2' | '1'

export function ReviewsSection({
  reviews,
  productName,
  averageRating = 4.5,
  totalReviews = reviews.length,
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterRating, setFilterRating] = useState<FilterRating>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const reviewsPerPage = 5

  // Filter reviews by rating
  const filteredReviews = reviews.filter((review) => {
    if (filterRating === 'all') return true
    return review.rating === parseInt(filterRating)
  })

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'oldest':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'most-helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage)
  const startIdx = (currentPage - 1) * reviewsPerPage
  const paginatedReviews = sortedReviews.slice(
    startIdx,
    startIdx + reviewsPerPage
  )

  // Rating distribution
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Rating Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">{averageRating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating as FilterRating)}
                className={`w-full text-left flex items-center gap-3 p-2 rounded transition-colors ${
                  filterRating === rating.toString()
                    ? 'bg-secondary'
                    : 'hover:bg-secondary'
                }`}
              >
                <span className="text-sm font-medium min-w-fit">{rating}★</span>
                <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{
                      width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground min-w-fit">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </button>
            ))}
          </div>

          {filterRating !== 'all' && (
            <button
              onClick={() => setFilterRating('all')}
              className="w-full text-primary text-sm font-medium hover:underline"
            >
              Clear filter
            </button>
          )}
        </motion.div>

        {/* Right: Reviews List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="lg:col-span-2 space-y-6"
        >
          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              {filteredReviews.length} reviews
              {filterRating !== 'all' && ` (${filterRating} stars)`}
            </p>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="most-helpful">Most Helpful</option>
            </select>
          </div>

          {/* Reviews */}
          {paginatedReviews.length > 0 ? (
            <div className="space-y-4">
              {paginatedReviews.map((review) => (
                <motion.div key={review.id} variants={itemVariants}>
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? 'bg-primary text-white'
                      : 'border border-border hover:bg-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
