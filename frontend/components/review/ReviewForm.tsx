'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const reviewSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  content: z.string().min(10, 'Review must be at least 10 characters').max(1000),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  productId: number
  productName: string
  onSubmitSuccess?: () => void
}

export function ReviewForm({
  productId,
  productName,
  onSubmitSuccess,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  })

  const onSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Review submitted successfully!')
      reset()
      setRating(0)
      onSubmitSuccess?.()
    } catch (error) {
      toast.error('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary rounded-lg p-6 mb-8"
    >
      <h3 className="text-lg font-semibold mb-6">Share Your Review</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Rate this product
          </label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    i < (hoveredRating || rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good!'}
              {rating === 3 && 'Good!'}
              {rating === 2 && 'Fair!'}
              {rating === 1 && 'Poor!'}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="text-sm font-medium mb-2 block">
            Review Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Summarize your experience in 5-100 characters"
            {...register('title')}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="text-sm font-medium mb-2 block">
            Your Review
          </label>
          <textarea
            id="content"
            placeholder="Share your experience with this product (10-1000 characters)"
            rows={5}
            {...register('content')}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </motion.div>
  )
}
