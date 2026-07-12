"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, ArrowLeft } from "lucide-react";
import { mockProducts } from "@/mock";
import { toast } from "sonner";
import { Product } from "@/types";
import { ProductForm } from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  const router = useRouter();
  const storageKey = "admin-products";
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return mockProducts;
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : mockProducts;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }
    const parsedUser = JSON.parse(user);
    if (!parsedUser.isAdmin) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;

    return products.filter((p) => {
      const haystacks = [p.name, p.category, p.description, p.slug].map(
        (value) => value.toLowerCase(),
      );
      return haystacks.some((value) => value.includes(query));
    });
  }, [products, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const perPage = 10;
    const start = (page - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 10));

  const handleDelete = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    toast.success("Product deleted successfully");
  };

  const handleCreateOrUpdate = (product: Product) => {
    if (editingProduct) {
      const updated = products.map((item) =>
        item.id === product.id ? product : item,
      );
      setProducts(updated);
      toast.success("Product updated successfully");
    } else {
      const updated = [product, ...products];
      setProducts(updated);
      toast.success("Product created successfully");
    }

    setEditingProduct(null);
    setIsModalOpen(false);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-secondary border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Manage Products</h1>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Value</p>
            <p className="text-3xl font-bold">
              Rs.{" "}
              {products
                .reduce((acc, p) => acc + p.price * p.stock, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Low Stock</p>
            <p className="text-3xl font-bold">
              {products.filter((p) => p.stock <= 10).length}
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary rounded-lg border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-background transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg overflow-hidden">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span>⭐ {product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </motion.div>

        {filteredProducts.length > 10 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use the form below to manage the shop listing.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(false);
                }}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              >
                Close
              </button>
            </div>
            <ProductForm
              mode={editingProduct ? "edit" : "create"}
              product={editingProduct ?? undefined}
              onSubmit={handleCreateOrUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
