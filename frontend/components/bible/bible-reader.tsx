"use client";

import { useFetchBibleContent } from "@/hooks/use-api";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function BibleReader() {
  const [chapter, setChapter] = useState(1);
  const { data, isLoading, error } = useFetchBibleContent(chapter);

  const handleNextChapter = () => {
    setChapter((prev) => prev + 1);
  };

  const handlePreviousChapter = () => {
    setChapter((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePreviousChapter}
            disabled={chapter === 1 || isLoading}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-foreground shadow-sm hover:bg-accent",
              (chapter === 1 || isLoading) &&
                "cursor-not-allowed opacity-50 hover:bg-background"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous chapter</span>
          </button>
          <div className="text-sm font-medium">Chapter {chapter}</div>
          <button
            type="button"
            onClick={handleNextChapter}
            disabled={isLoading}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-foreground shadow-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next chapter</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search verses..."
              className="h-10 rounded-md border bg-background pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-foreground shadow-sm hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Reading settings</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-sm text-destructive">
              {error instanceof Error
                ? error.message
                : "Failed to load chapter content"}
            </p>
          </div>
        ) : (
          <div className="divide-y p-6">
            <div className="pb-4">
              <h2 className="text-2xl font-semibold">{data?.book}</h2>
              <p className="text-sm text-muted-foreground">Chapter {chapter}</p>
            </div>
            <div className="space-y-4 pt-4">
              {data?.verses.map((verse) => (
                <div key={verse.verse} className="group relative">
                  <div className="absolute -left-8 top-0 hidden text-sm font-medium text-muted-foreground group-hover:block">
                    {verse.verse}
                  </div>
                  <p className="text-lg leading-relaxed">{verse.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
