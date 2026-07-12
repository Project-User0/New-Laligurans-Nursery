'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ArrowUp,
} from 'lucide-react'

interface User {
  name: string
  email: string
  isAdmin: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.isAdmin) {
      router.push('/')
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  if (isLoading || !user) {
    return null
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: 'Rs. 4,52,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Orders',
      value: '342',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      label: 'Total Products',
      value: '156',
      change: '+2.4%',
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      label: 'Total Users',
      value: '1,234',
      change: '+5.1%',
      icon: Users,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="bg-secondary border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              router.push('/')
            }}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary rounded-lg p-6 border border-border hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Manage Products',
              description: 'Add, edit, or remove products',
              href: '/admin/products',
              icon: Package,
              color: 'bg-blue-500',
            },
            {
              title: 'View Orders',
              description: 'Track and manage orders',
              href: '/admin/orders',
              icon: ShoppingCart,
              color: 'bg-green-500',
            },
            {
              title: 'Manage Users',
              description: 'View and manage customer accounts',
              href: '/admin/users',
              icon: Users,
              color: 'bg-orange-500',
            },
            {
              title: 'View Analytics',
              description: 'See sales and traffic analytics',
              href: '/admin/analytics',
              icon: BarChart3,
              color: 'bg-purple-500',
            },
            {
              title: 'Categories',
              description: 'Manage product categories',
              href: '/admin/categories',
              icon: TrendingUp,
              color: 'bg-pink-500',
            },
            {
              title: 'Payments',
              description: 'Manage payment methods and status',
              href: '/admin/payments',
              icon: DollarSign,
              color: 'bg-indigo-500',
            },
            {
              title: 'Settings',
              description: 'Configure store settings',
              href: '/admin/settings',
              icon: BarChart3,
              color: 'bg-slate-500',
            },
          ].map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-secondary rounded-lg p-6 border border-border hover:shadow-lg transition h-full"
                >
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                  <div className="mt-4 text-primary text-sm font-semibold group-hover:underline">
                    Go to {action.title.toLowerCase()} →
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-secondary rounded-lg p-6 border border-border"
        >
          <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[
              {
                id: 'ORD001',
                customer: 'John Doe',
                amount: 'Rs. 2,450',
                status: 'Delivered',
              },
              {
                id: 'ORD002',
                customer: 'Jane Smith',
                amount: 'Rs. 1,890',
                status: 'Processing',
              },
              {
                id: 'ORD003',
                customer: 'Bob Johnson',
                amount: 'Rs. 3,200',
                status: 'Shipped',
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-background transition"
              >
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.amount}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/orders"
            className="mt-4 text-primary text-sm font-semibold hover:underline"
          >
            View all orders →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
