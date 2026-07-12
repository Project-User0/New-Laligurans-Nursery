'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReviewCard } from '@/components/review/ReviewCard'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  MapPin,
  Phone,
  LogOut,
  Package,
  Heart,
  Settings,
  Star,
} from 'lucide-react'
import { mockReviews } from '@/mock/reviews'

interface UserData {
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
  })
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'reviews'>(
    'profile'
  )

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData(parsedUser)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData))
    setUser(formData)
    setIsEditing(false)
    toast.success('Profile updated successfully')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
    toast.success('Logged out successfully')
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">Manage your profile and orders</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-secondary rounded-lg p-6 border border-border sticky top-20">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'orders', label: 'Orders', icon: Package },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'reviews', label: 'My Reviews', icon: Star },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() =>
                      setActiveTab(id as 'profile' | 'orders' | 'wishlist' | 'reviews')
                    }
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      activeTab === id
                        ? 'bg-primary text-white'
                        : 'hover:bg-background'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-foreground mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          />
                        ) : (
                          <p className="font-semibold">{user.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          />
                        ) : (
                          <p className="font-semibold">{user.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">
                          Phone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          />
                        ) : (
                          <p>{formData.phone || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="font-semibold mb-4">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['address', 'city', 'state', 'country', 'zipCode'].map(
                        (field) => (
                          <div key={field}>
                            <label className="block text-sm text-foreground mb-2">
                              {field.charAt(0).toUpperCase() +
                                field.slice(1)}
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name={field}
                                value={
                                  formData[field as keyof UserData] || ''
                                }
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                              />
                            ) : (
                              <p>
                                {formData[field as keyof UserData] ||
                                  'Not provided'}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No items in wishlist</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
                {mockReviews.length > 0 ? (
                  <div className="space-y-4">
                    {mockReviews.slice(0, 5).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                    {mockReviews.length > 5 && (
                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing 5 of {mockReviews.length} reviews
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">You haven&apos;t written any reviews yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Share your experience with products you&apos;ve purchased
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
