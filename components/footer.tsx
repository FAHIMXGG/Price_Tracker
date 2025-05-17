import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">x</h3>
            <p className="text-sm text-gray-500">
              We provide high-quality products at competitive prices, with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-500 hover:text-primary text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-500 hover:text-primary text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-500 hover:text-primary text-sm">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-500 hover:text-primary text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-500 hover:text-primary text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" className="rounded-md" />
              <Button className="whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} ShopName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
