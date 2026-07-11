// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Pagination
export const ITEMS_PER_PAGE = 12
export const ITEMS_PER_PAGE_ADMIN = 20

// Currency
export const CURRENCY = 'NPR'
export const CURRENCY_SYMBOL = '₹'

// Roles
export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
} as const

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

// Product Categories
export const CATEGORIES = [
  { id: 1, name: 'Indoor Plants', slug: 'indoor-plants' },
  { id: 2, name: 'Outdoor Plants', slug: 'outdoor-plants' },
  { id: 3, name: 'Flowering Plants', slug: 'flowering-plants' },
  { id: 4, name: 'Succulents', slug: 'succulents' },
  { id: 5, name: 'Herbs', slug: 'herbs' },
  { id: 6, name: 'Vegetables', slug: 'vegetables' },
  { id: 7, name: 'Fruits', slug: 'fruits' },
  { id: 8, name: 'Air Purifying', slug: 'air-purifying' },
  { id: 9, name: 'Pet Friendly', slug: 'pet-friendly' },
  { id: 10, name: 'Rare Plants', slug: 'rare-plants' },
  { id: 11, name: 'Climbing Plants', slug: 'climbing-plants' },
  { id: 12, name: 'Aromatic Plants', slug: 'aromatic-plants' },
  { id: 13, name: 'Medicinal Plants', slug: 'medicinal-plants' },
  { id: 14, name: 'Aquatic Plants', slug: 'aquatic-plants' },
  { id: 15, name: 'Bonsai', slug: 'bonsai' },
  { id: 16, name: 'Cacti', slug: 'cacti' },
  { id: 17, name: 'Ferns', slug: 'ferns' },
  { id: 18, name: 'Tropical Plants', slug: 'tropical-plants' },
  { id: 19, name: 'Seasonal Plants', slug: 'seasonal-plants' },
  { id: 20, name: 'Accessories', slug: 'accessories' },
]

// Difficulty Levels
export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const

// Sunlight Requirements
export const SUNLIGHT_REQUIREMENTS = [
  'Full Sun',
  'Partial Sun',
  'Partial Shade',
  'Full Shade',
] as const

// Watering Frequency
export const WATERING_FREQUENCY = [
  'Daily',
  'Every 2-3 days',
  'Weekly',
  'Every 2 weeks',
  'Monthly',
] as const

// Common Services
export const SERVICES = [
  'Free Delivery',
  'Plant Care Consultation',
  'Installation Service',
  'Maintenance Service',
  'Plant Health Check',
  'Custom Arrangements',
]

// Toast Duration
export const TOAST_DURATION = 3000

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'laligurans_cart',
  WISHLIST: 'laligurans_wishlist',
  AUTH_TOKEN: 'laligurans_auth_token',
  USER: 'laligurans_user',
  RECENT_SEARCHES: 'laligurans_recent_searches',
  PREFERENCES: 'laligurans_preferences',
} as const
