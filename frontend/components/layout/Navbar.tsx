"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Store,
  Leaf,
  Sprout,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCart((state) => state.items);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/laligurans-logo.png"
              alt="New Laligurans Nursery"
              width={60}
              height={60}
              priority
              className="h-10 w-auto md:h-12"
            />

            <div className="hidden md:flex flex-col leading-none">
              <span className="text-md font-bold text-foreground">
                New Laligurans
              </span>
              <span className="text-sm font-medium text-primary">Nursery</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="relative flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-green-700
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700
              after:transition-all after:duration-500 hover:after:w-full"
            >
              <Store className="w-4 h-4" />
              <span>Shop</span>
            </Link>

            <Link
              href="/about"
              className="relative flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-green-700
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700
              after:transition-all after:duration-500 hover:after:w-full"
            >
              <Leaf className="w-4 h-4" />
              <span>About</span>
            </Link>

            <Link
              href="/services"
              className="relative flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-green-700
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700
              after:transition-all after:duration-500 hover:after:w-full"
            >
              <Sprout className="w-4 h-4" />
              <span>Services</span>
            </Link>

            <Link
              href="/contact"
              className="relative flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-green-700
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700
              after:transition-all after:duration-500 hover:after:w-full"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="text-foreground hover:text-primary transition"
            >
              <Heart className="w-6 h-6" />
            </Link>

            <Link
              href="/cart"
              className="relative text-foreground hover:text-primary transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              className="text-foreground hover:text-primary transition"
            >
              <User className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            <Link
              href="/shop"
              className="flex items-center gap-3 text-foreground hover:text-primary transition"
            >
              <Store className="w-5 h-5" />
              <span>Shop</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-3 text-foreground hover:text-primary transition"
            >
              <Leaf className="w-5 h-5" />
              <span>About</span>
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-3 text-foreground hover:text-primary transition"
            >
              <Sprout className="w-5 h-5" />
              <span>Services</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 text-foreground hover:text-primary transition"
            >
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
