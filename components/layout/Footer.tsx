'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lighthouse Bible Platform. All rights reserved.
        </p>
        <nav className="mt-4 flex justify-center space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
