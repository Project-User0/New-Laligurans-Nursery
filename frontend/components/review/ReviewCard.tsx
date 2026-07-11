'use client'

import { Review } from '@/types'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful)
  const [unhelpful, setUnhelpful] = useState(review.unhelpful)
  const [userVote, setUserVote] = useState<'helpful' | 'unhelpful' | null>(null)

  const handleHelpful = () => {
    if (userVote === 'helpful') {
      setHelpful(helpful - 1)
      setUserVote(null)
    } else {
      if (userVote === 'unhelpful') {
        setUnhelpful(unhelpful - 1)
      }
      setHelpful(helpful + 1)
      setUserVote('helpful')
    }
  }

  const handleUnhelpful = () => {
    if (userVote === 'unhelpful') {
      setUnhelpful(unhelpful - 1)
      setUserVote(null)
    } else {
      if (userVote === 'helpful') {
        setHelpful(helpful - 1)
      }
      setUnhelpful(unhelpful + 1)
      setUserVote('unhelpful')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-sm overflow-hidden">
            {review.userName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{review.userName}</p>
              {review.verified && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{review.rating}.0</span>
      </div>

      {/* Title and Content */}
      <h4 className="font-semibold text-sm mb-2">{review.title}</h4>
      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        {review.content}
      </p>

      {/* Helpful/Unhelpful */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Was this helpful?</span>
        <div className="flex gap-2">
          <button
            onClick={handleHelpful}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              userVote === 'helpful'
                ? 'bg-green-100 text-green-700'
                : 'bg-secondary hover:bg-secondary/80 text-foreground'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            Yes ({helpful})
          </button>
          <button
            onClick={handleUnhelpful}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              userVote === 'unhelpful'
                ? 'bg-red-100 text-red-700'
                : 'bg-secondary hover:bg-secondary/80 text-foreground'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            No ({unhelpful})
          </button>
        </div>
      </div>
    </div>
  )
}
