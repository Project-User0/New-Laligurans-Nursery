"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
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
          {/* Logo */}
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/laligurans-logo.png" // Update with your logo path
              alt="New Laligurans Nursery"
              width={60}
              height={60}
              priority
              className="h-10 w-auto md:h-12"
            />

            {/* Brand Name - Hidden on mobile */}
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-md font-bold text-foreground">
                New Laligurans
              </span>
              <span className="text-sm font-medium text-primary">Nursery</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-foreground hover:text-primary transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons */}
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            <Link
              href="/shop"
              className="block text-foreground hover:text-primary transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block text-foreground hover:text-primary transition"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-foreground hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block text-foreground hover:text-primary transition"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
