// Product Types
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discountPrice?: number
  stock: number
  images: string[]
  category: string
  categoryId: number
  rating: number
  reviewCount: number
  reviews?: Review[]
  specifications: Record<string, string>
  careInstructions: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  sunlight: 'Full Sun' | 'Partial Sun' | 'Partial Shade' | 'Full Shade'
  wateringFrequency: string
  height?: string
  potSize?: string
  airPurifying: boolean
  petFriendly: boolean
  isNew: boolean
  isBestseller: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image?: string
  featured: boolean
  productsCount?: number
  createdAt?: string
  updatedAt?: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: number
  product?: Product
  quantity: number
  price: number
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  appliedCoupon?: string
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: string
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: string
  paymentStatus: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  notes?: string
  giftMessage?: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  deliveredAt?: string
}

export interface OrderItem {
  id: string
  productId: number
  productName: string
  quantity: number
  price: number
  total: number
}

export interface OrderTimeline {
  status: string
  message: string
  timestamp: string
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin'
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export interface AuthUser extends User {
  token: string
}

// Address Types
export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

// Review Types
export interface Review {
  id: string
  productId: number
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  helpful: number
  unhelpful: number
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateReviewDTO {
  productId: number
  rating: number
  title: string
  content: string
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderValue?: number
  maxUses?: number
  usesCount: number
  expiresAt: string
  isActive: boolean
  description?: string
}

// Payment Types
export interface PaymentMethod {
  id: string
  name: string
  description: string
  isEnabled: boolean
  icon?: string
}

// Wishlist Types
export interface WishlistItem {
  id: string
  userId: string
  productId: number
  product?: Product
  addedAt: string
}

// Search Query Types
export interface SearchFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  difficulty?: string
  sunlight?: string
  inStock?: boolean
  airPurifying?: boolean
  petFriendly?: boolean
  isNew?: boolean
  isBestseller?: boolean
  sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high' | 'rating'
  page?: number
  limit?: number
}

export interface SearchResults {
  products: Product[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Contact & Blog Types
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  image: string
  category: string
  tags: string[]
  views: number
  createdAt: string
  updatedAt: string
}

// Admin Types
export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
  customersChange: number
}

export interface DashboardData {
  stats: AdminStats
  recentOrders: Order[]
  topProducts: Product[]
  chartData: Array<{ name: string; value: number }>
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Notification Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}
