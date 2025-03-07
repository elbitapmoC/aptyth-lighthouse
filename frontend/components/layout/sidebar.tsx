import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-foreground text-background w-64 h-full p-4 shadow-lg">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Bible Navigation</h2>
        <nav className="flex flex-col gap-4">
          <Link
            href="/bible/genesis"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Genesis
          </Link>
          <Link
            href="/bible/exodus"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Exodus
          </Link>
          <Link
            href="/bible/psalms"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Psalms
          </Link>
          <Link
            href="/bible/matthew"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            Matthew
          </Link>
          <Link
            href="/bible/john"
            className="text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
          >
            John
          </Link>
        </nav>
      </div>
    </aside>
  );
}
