'use client'

import Link from 'next/link'
import { ArrowLeft, Settings2, Store, ShieldCheck } from 'lucide-react'

const settings = [
  { title: 'Storefront Preferences', description: 'Theme, language, and checkout settings' },
  { title: 'Security', description: 'Password rules and admin access' },
  { title: 'Notifications', description: 'Email and order updates' },
]

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Configure your store experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl border border-border bg-secondary p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Store Essentials</h2>
              <p className="text-sm text-muted-foreground">Mock settings for the admin area</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {settings.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    {item.title === 'Security' ? <ShieldCheck className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
