"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success("Added to cart");
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist");
    }
  };

  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative overflow-hidden bg-secondary h-48">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
              -{discountPercent}%
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded text-xs font-bold">
              NEW
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">{product.category}</p>

        <div className="flex items-center gap-2 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                Rs. {product.discountPrice.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            onClick={handleWishlist}
            className={`px-3 py-2 rounded-lg border transition ${
              isWishlisted
                ? "border-primary text-primary"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
