'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Product } from '@/types'
import { ProductForm } from '@/components/admin/ProductForm'
import { toast } from 'sonner'
import { mockProducts } from '@/mock'
import { use } from 'react'

const storageKey = 'admin-products'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params: paramsPromise }: EditProductPageProps) {
  const params = use(paramsPromise)
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

  const savedProducts = JSON.parse(localStorage.getItem(storageKey) || 'null') || mockProducts
  const product = (savedProducts as Product[]).find((item) => String(item.id) === params.id)

  const handleUpdate = (updatedProduct: Product) => {
    const list = (JSON.parse(localStorage.getItem(storageKey) || 'null') || mockProducts) as Product[]
    const updatedList = list.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    localStorage.setItem(storageKey, JSON.stringify(updatedList))
    toast.success('Product updated successfully')
    router.push('/admin/products')
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background p-8 text-foreground">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    )
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
              <h1 className="text-2xl font-bold">Edit Product</h1>
              <p className="text-sm text-muted-foreground">Update your plant listing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl border border-border bg-secondary p-6">
          <ProductForm mode="edit" product={product} onSubmit={handleUpdate} />
        </div>
      </div>
    </div>
  )
}
