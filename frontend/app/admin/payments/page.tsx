'use client'

import Link from 'next/link'
import { ArrowLeft, CreditCard, CheckCircle2 } from 'lucide-react'

const payments = [
  { name: 'Cash on Delivery', status: 'Enabled', description: 'For local and doorstep orders' },
  { name: 'Esewa', status: 'Enabled', description: 'Popular digital wallet for Nepal' },
  { name: 'Card Payment', status: 'Review', description: 'Secure card processing for premium orders' },
]

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Payments</h1>
              <p className="text-sm text-muted-foreground">Overview of payment methods</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4">
          {payments.map((payment) => (
            <div key={payment.name} className="rounded-xl border border-border bg-secondary p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{payment.name}</h2>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-background px-3 py-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {payment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
