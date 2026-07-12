'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Download,
} from 'lucide-react'

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
  items: number
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 2450,
      status: 'Delivered',
      date: '2025-01-10',
      items: 3,
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 1890,
      status: 'Processing',
      date: '2025-01-11',
      items: 2,
    },
    {
      id: 'ORD003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      amount: 3200,
      status: 'Shipped',
      date: '2025-01-11',
      items: 4,
    },
    {
      id: 'ORD004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      amount: 1450,
      status: 'Pending',
      date: '2025-01-12',
      items: 1,
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }
    const parsedUser = JSON.parse(user)
    if (!parsedUser.isAdmin) {
      router.push('/')
    }
  }, [router])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-gray-100 text-gray-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-secondary border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Manage Orders</h1>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID, customer, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary rounded-lg border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-background transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-primary">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      Rs. {order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{order.items} items</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as Order['status']
                          )
                        }
                        className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold">
              Rs. {orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Pending Orders</p>
            <p className="text-3xl font-bold">
              {orders.filter((o) => o.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Delivered</p>
            <p className="text-3xl font-bold">
              {orders.filter((o) => o.status === 'Delivered').length}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
