"use client";

import { Book, Github } from "lucide-react";
import Link from "next/link";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/elbitapmoc/aptyth-lighthouse",
      icon: Github,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16">
        <div className="flex items-center justify-center gap-2">
          <Book className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Aptyth Lighthouse</h2>
        </div>
        <nav
          className="mt-8 flex justify-center gap-8"
          aria-label="Footer navigation"
        >
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm leading-6 text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex justify-center gap-6">
          {navigation.social.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">{item.name}</span>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Aptyth Lighthouse. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
