'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Product } from '@/types'
import { ProductForm } from '@/components/admin/ProductForm'
import { toast } from 'sonner'
import { mockProducts } from '@/mock'

const storageKey = 'admin-products'

export default function NewProductPage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(user)
    if (!parsedUser.isAdmin) {
      router.push('/')
    }
  }, [router])

  const handleCreate = (product: Product) => {
    const savedProducts = JSON.parse(localStorage.getItem(storageKey) || 'null') || mockProducts
    const updatedProducts = [product, ...savedProducts]
    localStorage.setItem(storageKey, JSON.stringify(updatedProducts))
    toast.success('Product created successfully')
    router.push('/admin/products')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/products" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Add Product</h1>
              <p className="text-sm text-muted-foreground">Create a product for the storefront</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl border border-border bg-secondary p-6">
          <ProductForm mode="create" onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  )
}
