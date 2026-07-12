'use client'

import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

const categories = [
  { name: 'Indoor Plants', products: 24, status: 'Popular' },
  { name: 'Succulents', products: 12, status: 'Growing' },
  { name: 'Air Purifying', products: 8, status: 'Trending' },
]

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Categories</h1>
              <p className="text-sm text-muted-foreground">Organize your plant collections</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div key={category.name} className="rounded-xl border border-border bg-secondary p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{category.products} products</p>
              <span className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{category.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
