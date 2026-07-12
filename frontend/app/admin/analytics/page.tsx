'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react'

const stats = [
  { label: 'Revenue', value: 'Rs. 452,500', change: '+12%', icon: DollarSign },
  { label: 'Orders', value: '342', change: '+8%', icon: ShoppingBag },
  { label: 'Customers', value: '1,234', change: '+5%', icon: Users },
  { label: 'Conversion', value: '4.8%', change: '+0.6%', icon: TrendingUp },
]

const chartBars = [72, 84, 66, 90, 78, 96, 88]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-sm text-muted-foreground">Store performance at a glance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-xl border border-border bg-secondary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-green-600">{item.change} vs last month</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-secondary p-6">
          <h2 className="text-lg font-semibold">Weekly Sales</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {chartBars.map((height, index) => (
              <div key={index} className="flex-1 rounded-t-lg bg-primary/80" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
