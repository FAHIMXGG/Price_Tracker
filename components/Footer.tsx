"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-black">priceTracker</span>. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
          <Link href="/privacy-policy" className="hover:text-black transition">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-black transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
