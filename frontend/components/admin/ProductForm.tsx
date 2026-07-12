'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product } from '@/types'
import { UploadCloud, X } from 'lucide-react'

const imageSchema = z.custom<FileList>((value) => value instanceof FileList, 'Please upload at least one image')
  .refine((files) => files && files.length > 0, 'Please upload at least one image')
  .refine((files) => Array.from(files ?? []).every((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)), 'Only PNG, JPG, and JPEG files are allowed')
  .refine((files) => Array.from(files ?? []).every((file) => file.size <= 5 * 1024 * 1024), 'Each image must be smaller than 5MB')
  .refine((files) => (files?.length ?? 0) <= 4, 'You can upload up to 4 images')

const formSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  discountPrice: z.coerce.number().optional().or(z.literal('')).transform((value) => (value === '' ? undefined : Number(value))),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  category: z.string().min(2, 'Category is required'),
  rating: z.coerce.number().min(0).max(5),
  careInstructions: z.string().min(5, 'Care instructions are required'),
  wateringFrequency: z.string().min(2, 'Watering frequency is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  sunlight: z.enum(['Full Sun', 'Partial Sun', 'Partial Shade', 'Full Shade']),
  airPurifying: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  featured: z.boolean().optional(),
  imageFiles: imageSchema.optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  mode: 'create' | 'edit'
  product?: Product
  onSubmit: (product: Product) => void
}

const defaultValues: Partial<ProductFormValues> = {
  difficulty: 'Beginner',
  sunlight: 'Partial Shade',
  rating: 4.5,
  stock: 10,
  featured: false,
  isNew: false,
  isBestseller: false,
  airPurifying: false,
  petFriendly: false,
}

export function ProductForm({ mode, product, onSubmit }: ProductFormProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(product?.images ?? [])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          category: product.category,
          rating: product.rating,
          careInstructions: product.careInstructions,
          wateringFrequency: product.wateringFrequency,
          difficulty: product.difficulty,
          sunlight: product.sunlight,
          airPurifying: product.airPurifying,
          petFriendly: product.petFriendly,
          isNew: product.isNew,
          isBestseller: product.isBestseller,
          featured: product.featured,
        }
      : defaultValues,
  })

  useEffect(() => {
    setPreviewImages(product?.images ?? [])
  }, [product])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files || files.length === 0) {
      setPreviewImages(product?.images ?? [])
      setValue('imageFiles', undefined as unknown as FileList, { shouldValidate: true })
      return
    }

    const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    setPreviewImages(previewUrls)
    setValue('imageFiles', files, { shouldValidate: true })
  }

  const submitProduct = (data: ProductFormValues) => {
    const newProduct: Product = {
      id: product?.id ?? Date.now(),
      name: data.name,
      slug: data.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      description: data.description,
      price: data.price,
      discountPrice: data.discountPrice,
      stock: data.stock,
      images: previewImages.length > 0 ? previewImages : ['/images/placeholder-plant.jpg'],
      category: data.category,
      categoryId: product?.categoryId ?? 1,
      rating: data.rating,
      reviewCount: product?.reviewCount ?? 0,
      specifications: product?.specifications ?? {
        'Height Range': 'Medium',
        'Pot Size': '20 cm',
        'Growth Rate': 'Medium',
        'Humidity': 'Medium',
      },
      careInstructions: data.careInstructions,
      difficulty: data.difficulty,
      sunlight: data.sunlight,
      wateringFrequency: data.wateringFrequency,
      height: product?.height ?? '60 cm',
      potSize: product?.potSize ?? '20 cm',
      airPurifying: data.airPurifying ?? false,
      petFriendly: data.petFriendly ?? false,
      isNew: data.isNew ?? false,
      isBestseller: data.isBestseller ?? false,
      featured: data.featured ?? false,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSubmit(newProduct)
    if (mode === 'create') {
      reset(defaultValues)
      setPreviewImages([])
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProduct)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product name</label>
          <input {...register('name')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input {...register('slug')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea {...register('description')} rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (Rs.)</label>
          <input type="number" {...register('price')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Discount Price (optional)</label>
          <input type="number" {...register('discountPrice')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock</label>
          <input type="number" {...register('stock')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <input {...register('category')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <input type="number" step="0.1" {...register('rating')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Difficulty</label>
          <select {...register('difficulty')} className="w-full rounded-lg border border-border bg-background px-3 py-2">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sunlight</label>
          <select {...register('sunlight')} className="w-full rounded-lg border border-border bg-background px-3 py-2">
            <option value="Full Sun">Full Sun</option>
            <option value="Partial Sun">Partial Sun</option>
            <option value="Partial Shade">Partial Shade</option>
            <option value="Full Shade">Full Shade</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Watering Frequency</label>
          <input {...register('wateringFrequency')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.wateringFrequency && <p className="text-sm text-red-500">{errors.wateringFrequency.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Care Instructions</label>
          <input {...register('careInstructions')} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
          {errors.careInstructions && <p className="text-sm text-red-500">{errors.careInstructions.message}</p>}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-border p-4">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-6 text-center text-sm text-muted-foreground">
          <UploadCloud className="h-5 w-5" />
          <span>Upload up to 4 images (PNG, JPG, JPEG, max 5MB each)</span>
          <input type="file" multiple accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleImageChange} />
        </label>
        {errors.imageFiles && <p className="mt-2 text-sm text-red-500">{errors.imageFiles.message as string}</p>}

        {previewImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {previewImages.map((image, index) => (
              <div key={`${image}-${index}`} className="relative overflow-hidden rounded-lg border border-border bg-background">
                <img src={image} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const nextImages = previewImages.filter((_, itemIndex) => itemIndex !== index)
                    setPreviewImages(nextImages)
                  }}
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('airPurifying')} />
          Air purifying
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('petFriendly')} />
          Pet friendly
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isNew')} />
          New arrival
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isBestseller')} />
          Bestseller
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('featured')} />
        Featured product
      </label>

      <div className="flex justify-end gap-3">
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">
          {mode === 'create' ? 'Create Product' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
