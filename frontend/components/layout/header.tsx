import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-foreground text-background py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold hover:underline">
          Lighthouse Bible Platform
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            About
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Features
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Contact
          </Link>
          <button
            className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-background hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
            onClick={() => alert("Coming Soon!")}
          >
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}