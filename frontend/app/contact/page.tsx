'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success('Message sent successfully! We will get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const faqs = [
    {
      question: 'What are your delivery times?',
      answer:
        'We offer delivery within 2-3 business days in Kathmandu and 3-5 business days for other parts of Nepal. Express delivery is available for an additional fee.',
    },
    {
      question: 'Do you offer plant warranty?',
      answer:
        'Yes, all our plants come with a 7-day health guarantee. If your plant arrives damaged, we will replace it for free.',
    },
    {
      question: `Can I return plants if I'm not satisfied?`,
      answer:
        `We have a 30-day satisfaction guarantee. If you're not happy with your purchase, contact us for a refund or replacement.`,
    },
    {
      question: 'Do you provide plant care instructions?',
      answer:
        'Yes! Each plant comes with detailed care instructions. We also offer free consultation via email or phone.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept debit cards, credit cards, net banking, mobile wallets, and cash on delivery for select areas.',
    },
    {
      question: 'Can I schedule a plant consultation?',
      answer:
        'Absolutely! You can schedule a free consultation by calling us or filling out the contact form.',
    },
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+977 9866224029', '+977 9866224029'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@laliguransnursery.com', 'support@laliguransnursery.com'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Manakamana Path, Butwal 32907', 'Nepal'],
    },
    {
      icon: Clock,
      title: 'Hours',
      details: [
        'Sun-Sat: 7:30 AM - 7:30 PM',
      ],
    },
  ]

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-primary-foreground/90">
              We&apos;d love to hear from you. Contact us anytime!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-muted-foreground">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-secondary rounded-lg p-6 text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-foreground/80">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium mb-2 block"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register('name')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium mb-2 block"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium mb-2 block"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9841234567"
                    {...register('phone')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium mb-2 block"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="What is this about?"
                    {...register('subject')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    {...register('message')}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Why Contact Us */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Why Contact Us?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Expert Support',
                    desc: 'Get answers from our team of plant specialists',
                  },
                  {
                    title: 'Custom Solutions',
                    desc: 'We can create personalized packages for your needs',
                  },
                  {
                    title: 'Quick Response',
                    desc: 'We respond to inquiries within 24 hours',
                  },
                  {
                    title: 'Bulk Orders',
                    desc: 'Special pricing available for corporate and bulk orders',
                  },
                  {
                    title: 'Feedback',
                    desc: 'We value your feedback to improve our services',
                  },
                  {
                    title: 'Collaborations',
                    desc: 'Interested in partnering with us? Let&apos;s talk!',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-foreground/80">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={itemVariants}
                className="bg-background rounded-lg border border-border group"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold flex items-center justify-between hover:bg-secondary transition-colors">
                  {faq.question}
                  <span className="group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-4 text-foreground/80 border-t border-border pt-4">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
