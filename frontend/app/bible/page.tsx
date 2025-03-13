import BibleReader from "@/components/bible/bible-reader";
import { Book } from "lucide-react";

export default function BiblePage() {
  return (
    <div className="container mx-auto min-h-screen space-y-8 py-8">
      <header className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Book className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Bible Reading</h1>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Explore the Word of God chapter by chapter, with verse-by-verse
          reading and study tools.
        </p>
      </header>

      <main className="mx-auto max-w-4xl">
        <BibleReader />
      </main>
    </div>
  );
}
