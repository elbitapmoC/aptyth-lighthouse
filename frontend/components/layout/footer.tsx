import React from "react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-6 px-4">
      <div className="container mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} Lighthouse Bible Platform. All
          rights reserved.
        </p>
        <nav className="flex gap-4">
          <a
            href="/privacy-policy"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}
