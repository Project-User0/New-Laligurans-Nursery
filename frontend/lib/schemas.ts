import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Contact Schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Address Schema
export const addressSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().regex(/^\d{4,6}$/, 'Invalid postal code'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional(),
})

// Profile Schema
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be 10 digits')
    .optional()
    .or(z.literal('')),
})

// Password Change Schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be 5 or less'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Review must be at least 10 characters'),
})

// Coupon Schema
export const couponSchema = z.object({
  code: z.string().min(3, 'Coupon code is required'),
})

// Checkout Schema
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  sameAsBilling: z.boolean().optional(),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  couponCode: z.string().optional(),
  giftMessage: z.string().max(500, 'Gift message must be less than 500 characters').optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
})

// Product Filter Schema
export const productFilterSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  difficulty: z.string().optional(),
  sunlight: z.string().optional(),
  inStock: z.boolean().optional(),
  airPurifying: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  sortBy: z
    .enum(['newest', 'popular', 'price-low', 'price-high', 'rating'])
    .optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).optional().default(12),
})

// Admin Product Schema
export const adminProductSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  discountPrice: z.coerce.number().positive().optional(),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  sunlight: z.enum(['Full Sun', 'Partial Sun', 'Partial Shade', 'Full Shade']),
  wateringFrequency: z.string().min(1, 'Watering frequency is required'),
  height: z.string().optional(),
  potSize: z.string().optional(),
  careInstructions: z.string().min(10, 'Care instructions are required'),
  airPurifying: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  featured: z.boolean().optional(),
})

// Admin Category Schema
export const adminCategorySchema = z.object({
  name: z.string().min(3, 'Category name is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().optional(),
  featured: z.boolean().optional(),
})

// Blog Schema
export const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type ProductFilterInput = z.infer<typeof productFilterSchema>
export type AdminProductInput = z.infer<typeof adminProductSchema>
export type AdminCategoryInput = z.infer<typeof adminCategorySchema>
