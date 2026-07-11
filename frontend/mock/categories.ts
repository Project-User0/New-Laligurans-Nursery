import { Category } from '@/types'

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Indoor Plants',
    slug: 'indoor-plants',
    description: 'Beautiful plants perfect for your home interiors',
    image: '/images/categories/indoor-plants.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Outdoor Plants',
    slug: 'outdoor-plants',
    description: 'Hardy plants for gardens and outdoor spaces',
    image: '/images/categories/outdoor-plants.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Flowering Plants',
    slug: 'flowering-plants',
    description: 'Vibrant flowering plants to add color',
    image: '/images/categories/flowering-plants.jpg',
    featured: true,
  },
  {
    id: 4,
    name: 'Succulents',
    slug: 'succulents',
    description: 'Low-maintenance succulent plants',
    image: '/images/categories/succulents.jpg',
    featured: true,
  },
  {
    id: 5,
    name: 'Herbs',
    slug: 'herbs',
    description: 'Aromatic and culinary herbs',
    image: '/images/categories/herbs.jpg',
    featured: true,
  },
  {
    id: 6,
    name: 'Vegetables',
    slug: 'vegetables',
    description: 'Fresh vegetables for home gardening',
    image: '/images/categories/vegetables.jpg',
    featured: false,
  },
  {
    id: 7,
    name: 'Fruits',
    slug: 'fruits',
    description: 'Fruit-bearing plants for home gardens',
    image: '/images/categories/fruits.jpg',
    featured: false,
  },
  {
    id: 8,
    name: 'Air Purifying',
    slug: 'air-purifying',
    description: 'Plants that purify air and improve indoor quality',
    image: '/images/categories/air-purifying.jpg',
    featured: true,
  },
  {
    id: 9,
    name: 'Pet Friendly',
    slug: 'pet-friendly',
    description: 'Safe plants for pets and animals',
    image: '/images/categories/pet-friendly.jpg',
    featured: true,
  },
  {
    id: 10,
    name: 'Rare Plants',
    slug: 'rare-plants',
    description: 'Unique and collectible plant varieties',
    image: '/images/categories/rare-plants.jpg',
    featured: true,
  },
  {
    id: 11,
    name: 'Climbing Plants',
    slug: 'climbing-plants',
    description: 'Vines and climbers for walls and trellises',
    image: '/images/categories/climbing-plants.jpg',
    featured: false,
  },
  {
    id: 12,
    name: 'Aromatic Plants',
    slug: 'aromatic-plants',
    description: 'Fragrant plants for sensory pleasure',
    image: '/images/categories/aromatic-plants.jpg',
    featured: false,
  },
  {
    id: 13,
    name: 'Medicinal Plants',
    slug: 'medicinal-plants',
    description: 'Plants with medicinal and healing properties',
    image: '/images/categories/medicinal-plants.jpg',
    featured: false,
  },
  {
    id: 14,
    name: 'Aquatic Plants',
    slug: 'aquatic-plants',
    description: 'Plants for water gardens and aquariums',
    image: '/images/categories/aquatic-plants.jpg',
    featured: false,
  },
  {
    id: 15,
    name: 'Bonsai',
    slug: 'bonsai',
    description: 'Miniature artistic bonsai trees',
    image: '/images/categories/bonsai.jpg',
    featured: false,
  },
  {
    id: 16,
    name: 'Cacti',
    slug: 'cacti',
    description: 'Desert cacti and succulents',
    image: '/images/categories/cacti.jpg',
    featured: false,
  },
  {
    id: 17,
    name: 'Ferns',
    slug: 'ferns',
    description: 'Delicate ferns for shaded areas',
    image: '/images/categories/ferns.jpg',
    featured: false,
  },
  {
    id: 18,
    name: 'Tropical Plants',
    slug: 'tropical-plants',
    description: 'Exotic tropical plants for warm environments',
    image: '/images/categories/tropical-plants.jpg',
    featured: false,
  },
  {
    id: 19,
    name: 'Seasonal Plants',
    slug: 'seasonal-plants',
    description: 'Plants for different seasons',
    image: '/images/categories/seasonal-plants.jpg',
    featured: false,
  },
  {
    id: 20,
    name: 'Accessories',
    slug: 'accessories',
    description: 'Plant pots, soil, fertilizers, and tools',
    image: '/images/categories/accessories.jpg',
    featured: false,
  },
]

export function getCategoryById(id: number) {
  return mockCategories.find((c) => c.id === id)
}

export function getCategoryBySlug(slug: string) {
  return mockCategories.find((c) => c.slug === slug)
}

export function getFeaturedCategories() {
  return mockCategories.filter((c) => c.featured)
}
