'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderId = Math.random().toString(36).substring(2, 11).toUpperCase()

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase
          </p>

          {/* Order Number */}
          <div className="bg-secondary rounded-lg p-6 border border-border mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-bold text-primary">{orderId}</p>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Order Placed</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border text-muted-foreground flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Processing</p>
                <p className="text-sm text-muted-foreground">
                  Your order is being prepared
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border text-muted-foreground flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Shipping</p>
                <p className="text-sm text-muted-foreground">
                  You will receive shipping updates
                </p>
              </div>
            </div>
          </div>

          {/* Email Notification */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8 flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-blue-900">Confirmation Email Sent</p>
              <p className="text-sm text-blue-700">
                We&apos;ve sent you an email with your order details and tracking
                information
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
            >
              View Order
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
