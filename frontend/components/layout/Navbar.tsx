'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Lighthouse Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">Lighthouse Bible Platform</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="hover:text-gray-200 transition-colors">Home</a>
          </Link>
          <Link href="#features">
            <a className="hover:text-gray-200 transition-colors">Features</a>
          </Link>
          <Link href="#community">
            <a className="hover:text-gray-200 transition-colors">Community</a>
          </Link>
          <Link href="#ai">
            <a className="hover:text-gray-200 transition-colors">AI</a>
          </Link>
        </div>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link href="/">
            <a className="block px-4 py-2 hover:bg-blue-800">Home</a>
          </Link>
          <Link href="#features">
            <a className="block px-4 py-2 hover:bg-blue-800">Features</a>
          </Link>
          <Link href="#community">
            <a className="block px-4 py-2 hover:bg-blue-800">Community</a>
          </Link>
          <Link href="#ai">
            <a className="block px-4 py-2 hover:bg-blue-800">AI</a>
          </Link>
        </div>
      )}
    </nav>
  );
}
