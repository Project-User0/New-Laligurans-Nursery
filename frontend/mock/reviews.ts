import { Review } from '@/types'

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: 1,
    userId: 'u1',
    userName: 'Priya Sharma',
    userAvatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    title: 'Amazing plant, thriving at home!',
    content:
      'The Monstera arrived in excellent condition. It was well-packaged and started growing immediately. The leaves are getting bigger each week. Highly recommend!',
    helpful: 24,
    unhelpful: 1,
    verified: true,
    createdAt: '2024-07-08',
    updatedAt: '2024-07-08',
  },
  {
    id: 'r2',
    productId: 1,
    userId: 'u2',
    userName: 'Rajesh Kumar',
    userAvatar: '/images/avatars/avatar-2.jpg',
    rating: 4,
    title: 'Good quality, though growth is slow',
    content: 'The plant arrived healthy. Growth is a bit slower than expected, but overall quality is great.',
    helpful: 15,
    unhelpful: 2,
    verified: true,
    createdAt: '2024-07-05',
    updatedAt: '2024-07-05',
  },
  {
    id: 'r3',
    productId: 2,
    userId: 'u3',
    userName: 'Anita Patel',
    userAvatar: '/images/avatars/avatar-3.jpg',
    rating: 5,
    title: 'Perfect for beginners!',
    content:
      'Pothos is incredibly easy to care for. Even with minimal attention, it thrives and grows beautifully. Perfect for someone starting their plant journey.',
    helpful: 32,
    unhelpful: 0,
    verified: true,
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
  },
  {
    id: 'r4',
    productId: 3,
    userId: 'u4',
    userName: 'Vikram Singh',
    userAvatar: '/images/avatars/avatar-4.jpg',
    rating: 5,
    title: 'Incredibly resilient plant',
    content:
      'Snake plant is living up to its reputation. I neglect it, forget to water it, and it still looks perfect. A must-have for every home.',
    helpful: 28,
    unhelpful: 1,
    verified: true,
    createdAt: '2024-06-30',
    updatedAt: '2024-06-30',
  },
  {
    id: 'r5',
    productId: 4,
    userId: 'u5',
    userName: 'Deepa Gupta',
    userAvatar: '/images/avatars/avatar-5.jpg',
    rating: 4,
    title: 'Beautiful but needs attention',
    content:
      'The Fiddle Leaf Fig looks stunning in my living room. It requires regular care and attention, but if maintained properly, it looks absolutely gorgeous.',
    helpful: 19,
    unhelpful: 3,
    verified: true,
    createdAt: '2024-07-01',
    updatedAt: '2024-07-01',
  },
  {
    id: 'r6',
    productId: 5,
    userId: 'u6',
    userName: 'Nitin Joshi',
    userAvatar: '/images/avatars/avatar-6.jpg',
    rating: 5,
    title: 'Zero-care plant, maximum impact',
    content:
      'ZZ plant sits in the corner of my office with minimal light and I barely water it. Still looks fresh and glossy. Absolute winner!',
    helpful: 31,
    unhelpful: 0,
    verified: true,
    createdAt: '2024-07-02',
    updatedAt: '2024-07-02',
  },
  {
    id: 'r7',
    productId: 11,
    userId: 'u7',
    userName: 'Sakshi Verma',
    userAvatar: '/images/avatars/avatar-7.jpg',
    rating: 5,
    title: 'Stunning flowers, long-lasting',
    content:
      'My red Anthurium has been blooming continuously for months. The flowers are absolutely stunning and add vibrant color to my room.',
    helpful: 26,
    unhelpful: 1,
    verified: true,
    createdAt: '2024-07-04',
    updatedAt: '2024-07-04',
  },
  {
    id: 'r8',
    productId: 15,
    userId: 'u8',
    userName: 'Mohit Yadav',
    userAvatar: '/images/avatars/avatar-8.jpg',
    rating: 4,
    title: 'Medicinal and beautiful',
    content: 'Great Aloe Vera plant. Very medicinal and hardly needs any care. Perfect addition to any home.',
    helpful: 22,
    unhelpful: 0,
    verified: true,
    createdAt: '2024-07-06',
    updatedAt: '2024-07-06',
  },
  {
    id: 'r9',
    productId: 20,
    userId: 'u9',
    userName: 'Ananya Singh',
    userAvatar: '/images/avatars/avatar-9.jpg',
    rating: 5,
    title: 'Fresh basil all year round!',
    content:
      'Having fresh basil from my own plant is amazing. It grows quickly and I can harvest it regularly for cooking. Highly satisfied!',
    helpful: 28,
    unhelpful: 0,
    verified: true,
    createdAt: '2024-06-28',
    updatedAt: '2024-06-28',
  },
  {
    id: 'r10',
    productId: 25,
    userId: 'u10',
    userName: 'Arjun Malhotra',
    userAvatar: '/images/avatars/avatar-10.jpg',
    rating: 5,
    title: 'Garden showstopper!',
    content:
      'The red Hibiscus is absolutely gorgeous when in bloom. Gets so many compliments from visitors. Regular care pays off beautifully.',
    helpful: 20,
    unhelpful: 1,
    verified: true,
    createdAt: '2024-07-07',
    updatedAt: '2024-07-07',
  },
]

export function getReviewsByProductId(productId: number) {
  return mockReviews.filter((r) => r.productId === productId)
}

export function getAverageRating(productId: number) {
  const reviews = getReviewsByProductId(productId)
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function getReviewStats(productId: number) {
  const reviews = getReviewsByProductId(productId)
  const stats = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  reviews.forEach((r) => {
    stats[r.rating as keyof typeof stats]++
  })

  return stats
}
