'use client';

import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Lighthouse Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800">
            Lighthouse Bible Platform
          </span>
        </div>
        <nav className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            About
          </a>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
