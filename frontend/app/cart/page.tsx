'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCart } from '@/store/cart'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, subtotal, tax, shipping, discount, appliedCoupon, removeCoupon } = useCart()

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/shop"
                className="inline-block bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:font-semibold hover:bg-opacity-90 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border rounded-lg hover:shadow-sm transition bg-card"
                    >
                      {/* Left: Product Image & Details */}
                      <div className="flex gap-4 w-full sm:flex-1 items-start">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-lg flex-shrink-0 overflow-hidden">
                          {item.product?.images?.[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product?.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/${item.product?.slug}`}
                            className="font-semibold text-sm sm:text-base hover:text-primary transition line-clamp-2 block"
                          >
                            {item.product?.name}
                          </Link>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Rs. {item.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions, Quantity, & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 sm:gap-2 border border-border rounded-lg px-2 py-1 bg-background">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="p-1 hover:bg-secondary rounded transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-secondary rounded transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price & Remove Action */}
                        <div className="text-right flex flex-col items-end min-w-[5rem] sm:min-w-[7rem]">
                          <p className="font-semibold text-sm sm:text-base">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-600 hover:underline mt-1 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                <div className="bg-white dark:bg-zinc-950 border border-border rounded-lg p-5 sm:p-6 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order Summary</h3>

                  <div className="space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border text-sm sm:text-base">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (13%)</span>
                      <span>Rs. {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                        {shipping === 0 ? 'FREE' : `Rs. ${shipping.toLocaleString()}`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount {appliedCoupon && `(${appliedCoupon})`}</span>
                        <span>-Rs. {discount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-lg sm:text-xl font-bold mb-6">
                    <span>Total</span>
                    <span className="text-primary">Rs. {total.toLocaleString()}</span>
                  </div>

                  {/* Coupon */}
                  <div className="mb-6 space-y-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full px-3 py-2 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button className="w-full py-2 border border-border rounded-lg bg-secondary hover:bg-secondary/80 transition text-sm font-medium">
                      Apply Coupon
                    </button>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="block w-full bg-primary text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-opacity-90 transition text-center text-sm sm:text-base"
                    >
                      Proceed to Checkout
                    </Link>

                    <Link
                      href="/shop"
                      className="block w-full py-2.5 sm:py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-opacity-90 transition text-center text-sm"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}