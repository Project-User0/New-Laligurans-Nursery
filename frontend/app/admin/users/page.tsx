'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, ShieldCheck } from 'lucide-react'

const users = [
  { id: 'u1', name: 'Aarav Shrestha', email: 'aarav@example.com', phone: '9800000001', role: 'Admin', status: 'Active' },
  { id: 'u2', name: 'Mina Joshi', email: 'mina@example.com', phone: '9800000002', role: 'Customer', status: 'Active' },
  { id: 'u3', name: 'Sujan Lama', email: 'sujan@example.com', phone: '9800000003', role: 'Customer', status: 'Pending' },
]

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Manage Users</h1>
              <p className="text-sm text-muted-foreground">A quick view of your customer accounts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-border bg-secondary p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    {user.role === 'Admin' && <ShieldCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{user.email}</span>
                    <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{user.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-background px-3 py-1 text-sm">{user.role}</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{user.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
