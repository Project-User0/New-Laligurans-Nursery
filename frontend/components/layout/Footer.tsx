"use client";

import Link from "next/link";
import { Share2, Heart, MessageSquare, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/laligurans-logo.png" // Update with your logo path
                alt="New Laligurans Nursery"
                width={60}
                height={60}
                className="h-12 w-auto"
                priority
              />

              <div className="leading-none">
                <h3 className="text-lg font-bold text-foreground">
                  New Laligurans
                </h3>
                <p className="text-sm font-medium text-primary">Nursery</p>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-6">
              Bringing nature closer to your home with premium indoor plants,
              outdoor plants, flowering plants, gardening essentials, and expert
              plant care solutions across Nepal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-primary"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Email: info@laligurans.com
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Phone: +977 9866224029
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} Laligurans Nursery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
