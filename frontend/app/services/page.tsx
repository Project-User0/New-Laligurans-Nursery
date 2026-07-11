'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  Home,
  Briefcase,
  Package,
  BookOpen,
  Stethoscope,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
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

  const services = [
    {
      icon: Lightbulb,
      title: 'Plant Consultation',
      description:
        'Get expert advice on selecting the perfect plants for your space and lifestyle.',
      features: [
        'Personalized plant recommendations',
        'Care instructions tailored to your environment',
        'Expert tips on placement and lighting',
        'Seasonal plant selection guidance',
      ],
      cta: 'Schedule Consultation',
    },
    {
      icon: Home,
      title: 'Interior Plant Styling',
      description:
        'Transform your space with professionally styled indoor plants and arrangements.',
      features: [
        'Custom plant arrangements',
        'Space assessment and design',
        'Eco-friendly styling solutions',
        'Maintenance schedule creation',
      ],
      cta: 'Get a Design Proposal',
    },
    {
      icon: Briefcase,
      title: 'Corporate Plant Rental',
      description:
        'Enhance your office environment with premium plants on a rental basis.',
      features: [
        'Regular maintenance included',
        'Flexible rental terms',
        'Monthly plant rotation option',
        'Professional installations',
      ],
      cta: 'Inquire Now',
    },
    {
      icon: Package,
      title: 'Plant Subscription Box',
      description:
        'Receive carefully curated plants delivered to your door every month.',
      features: [
        'Monthly plant deliveries',
        'Surprise plant selections',
        'Exclusive varieties',
        'Subscriber-only discounts',
      ],
      cta: 'Subscribe Today',
    },
    {
      icon: BookOpen,
      title: 'Workshops & Events',
      description:
        'Learn from our experts through interactive workshops and community events.',
      features: [
        'Plant care workshops',
        'Propagation techniques',
        'Sustainable gardening',
        'Community gatherings',
      ],
      cta: 'View Schedule',
    },
    {
      icon: Stethoscope,
      title: 'Plant Health Checkup',
      description:
        'Professional diagnosis and treatment for struggling or sick plants.',
      features: [
        'Health diagnosis',
        'Pest and disease treatment',
        'Nutritional guidance',
        'Recovery monitoring',
      ],
      cta: 'Book Checkup',
    },
  ]

  const benefits = [
    {
      title: 'Expert Knowledge',
      description: 'Decades of combined horticultural expertise at your service',
    },
    {
      title: 'Personalized Service',
      description: 'Every recommendation tailored to your specific needs',
    },
    {
      title: 'Quality Guaranteed',
      description: 'Only the healthiest plants and premium materials used',
    },
    {
      title: 'Ongoing Support',
      description: 'Continuous guidance and support throughout your plant journey',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive solutions for all your plant and greenery needs
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
            <span className="text-muted-foreground">Services</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-secondary rounded-lg p-8 hover:shadow-lg transition-shadow group"
                >
                  <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />

                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-foreground/80 mb-6">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition">
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We go beyond just selling plants. We&apos;re committed to your
              success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background rounded-lg p-6 text-center"
              >
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-foreground/80">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Contact', desc: 'Reach out to us' },
                { step: 2, title: 'Consult', desc: 'Discuss your needs' },
                { step: 3, title: 'Plan', desc: 'Create custom solution' },
                { step: 4, title: 'Enjoy', desc: 'Beautiful results' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Choose the service that best suits your needs and let our experts
              help you create your perfect green space
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/shop"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Browse Plants
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
