'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { Leaf, Users, Target, Heart, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
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

  const team = [
    {
      name: 'Hari Thapa',
      role: 'Founder & CEO',
      image: '👨‍💼',
      bio: '15+ years in horticulture and plant care',
    },
    {
      name: 'Sushma Sharma',
      role: 'Head of Plant Selection',
      image: '👩‍🌾',
      bio: 'Expert botanist with passion for biodiversity',
    },
    {
      name: 'Ramesh Paudel',
      role: 'Customer Experience Lead',
      image: '👨‍💻',
      bio: 'Dedicated to ensuring customer satisfaction',
    },
    {
      name: 'Priya Neupane',
      role: 'Community Manager',
      image: '👩‍💼',
      bio: 'Building a thriving plant-loving community',
    },
  ]

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description:
        'We prioritize eco-friendly practices in every aspect of our business, from sourcing to packaging.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'We believe in building a community of plant enthusiasts who share knowledge and experiences.',
    },
    {
      icon: Target,
      title: 'Quality',
      description:
        'Only the healthiest, most beautiful plants reach our customers. Quality is never compromised.',
    },
    {
      icon: Heart,
      title: 'Care',
      description:
        'We genuinely care about our customers and the well-being of every plant that leaves our nursery.',
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
              About Laligurans Nursery
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Bringing the beauty of nature into your home since 2018
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
            <span className="text-muted-foreground">About</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                At Laligurans Nursery, our mission is simple yet profound: to make
                plant parenthood accessible and enjoyable for everyone.
              </p>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                We believe that every home deserves the beauty, health benefits,
                and joy that plants bring. Whether you&apos;re a seasoned plant
                collector or just starting your green journey, we&apos;re here to
                support you with premium plants, expert guidance, and a community
                of fellow plant lovers.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our commitment extends beyond just selling plants. We&apos;re
                dedicated to promoting environmental awareness, sustainable
                practices, and a deeper connection with nature.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-secondary rounded-lg p-8 text-center"
            >
              <Leaf className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Est. 2018</h3>
              <p className="text-muted-foreground">
                Over 6 years of dedicated service to the plant-loving community
                across Nepal
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide every decision we make
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-background rounded-lg p-6 text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground/80">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate plant experts dedicated to your green journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-secondary rounded-lg p-6 text-center"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-foreground/80">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-8">
            {[
              {
                year: '2018',
                title: 'Founded',
                description:
                  'Laligurans Nursery was founded with a vision to make plants accessible to everyone.',
              },
              {
                year: '2019',
                title: 'First 1000 Customers',
                description:
                  'We reached our first 1000 happy customers and expanded our plant collection.',
              },
              {
                year: '2021',
                title: 'Nation-Wide Delivery',
                description:
                  'Expanded delivery services across all of Nepal, reaching remote areas.',
              },
              {
                year: '2023',
                title: 'Online Store Launch',
                description:
                  'Launched our comprehensive online store for easier browsing and ordering.',
              },
              {
                year: '2024',
                title: 'Community Growth',
                description:
                  'Built a thriving community of 50,000+ plant enthusiasts and counting.',
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className="w-0.5 h-20 bg-border mt-4" />
                  )}
                </div>
                <div className="pb-8">
                  <h4 className="text-lg font-semibold text-primary mb-1">
                    {milestone.year}
                  </h4>
                  <h5 className="font-semibold mb-2">{milestone.title}</h5>
                  <p className="text-foreground/80">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Be part of a community that celebrates green living and sustainable
              practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Start Shopping
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
