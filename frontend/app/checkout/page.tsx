'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCart } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Check,
  ChevronRight,
} from 'lucide-react'

interface ShippingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentData {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, subtotal, tax, shipping } = useCart()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  })

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setShippingData((prev) => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
      }))
    }
  }, [items.length, router])

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentData((prev) => ({ ...prev, [name]: value }))
  }

  const validateShipping = () => {
    if (
      !shippingData.firstName ||
      !shippingData.lastName ||
      !shippingData.email ||
      !shippingData.phone ||
      !shippingData.address ||
      !shippingData.city ||
      !shippingData.state ||
      !shippingData.zipCode
    ) {
      toast.error('Please fill in all shipping fields')
      return false
    }
    return true
  }

  const validatePayment = () => {
    if (
      !paymentData.cardName ||
      !paymentData.cardNumber ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      toast.error('Please fill in all payment fields')
      return false
    }
    if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Card number must be 16 digits')
      return false
    }
    return true
  }

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2)
    } else if (step === 2 && validatePayment()) {
      setStep(3)
    }
  }

  const handlePlaceOrder = async () => {
    if (!agreed) {
      toast.error('Please agree to terms and conditions')
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Order placed successfully!')
      
      // Clear cart
      localStorage.removeItem('cart')
      
      router.push('/order-confirmation')
    } catch (error) {
      toast.error('Failed to place order')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background text-gray-900">
      <Navbar />

      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    step >= stepNum
                      ? 'bg-primary text-white'
                      : 'bg-secondary border-2 border-border'
                  }`}
                >
                  {step > stepNum ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    stepNum
                  )}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      step > stepNum ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Payment</span>
            <span>Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={step}
              className="bg-secondary rounded-lg p-6 border border-border"
            >
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={shippingData.firstName}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={shippingData.lastName}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={shippingData.zipCode}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                      <select
                        name="country"
                        value={shippingData.country}
                        onChange={handleShippingChange}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      >
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />

                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, '')
                        value = value.replace(/(\d{4})/g, '$1 ').trim()
                        setPaymentData((prev) => ({
                          ...prev,
                          cardNumber: value,
                        }))
                      }}
                      maxLength={19}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4)
                          }
                          setPaymentData((prev) => ({
                            ...prev,
                            expiryDate: value,
                          }))
                        }}
                        maxLength={5}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentData((prev) => ({
                            ...prev,
                            cvv: value,
                          }))
                        }}
                        maxLength={4}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Shipping To:</h3>
                      <p className="text-muted-foreground">
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p className="text-muted-foreground">
                        {shippingData.address}
                      </p>
                      <p className="text-muted-foreground">
                        {shippingData.city}, {shippingData.state}{' '}
                        {shippingData.zipCode}
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold mb-3">Items</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-muted-foreground"
                          >
                            <span>
                              {item.product?.name} x {item.quantity}
                            </span>
                            <span>
                              Rs. 
                              {(
                                item.price * item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 rounded mt-1"
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to the terms and conditions and privacy policy
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="flex-1 py-2 border border-border rounded-lg hover:bg-background transition disabled:opacity-50"
                >
                  Previous
                </button>
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                  >
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-secondary rounded-lg p-6 border border-border">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product?.name} x{item.quantity}
                    </span>
                    <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
