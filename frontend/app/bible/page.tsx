import BibleReader from "@/components/bible/bible-reader";
import React from "react";

export default function BiblePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Bible Reading</h1>
        <p className="text-center text-sm text-gray-600">
          Explore the Word of God chapter by chapter.
        </p>
      </header>
      <main className="max-w-3xl mx-auto">
        <BibleReader />
      </main>
    </div>
  );
}
