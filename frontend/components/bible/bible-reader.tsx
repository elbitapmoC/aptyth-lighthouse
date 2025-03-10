"use client";

import React, { useState } from "react";
import useBibleContent from "@/hooks/useBibleContent";

export default function BibleReader() {
  const [chapter, setChapter] = useState(1);
  const { verses, isLoading, isError, error } = useBibleContent("Genesis", chapter);

  const handleNextChapter = () => {
    setChapter((prevChapter) => prevChapter + 1);
  };

  const handlePreviousChapter = () => {
    setChapter((prevChapter) => (prevChapter > 1 ? prevChapter - 1 : prevChapter));
  };

  return (
    <div className="p-4 bg-card text-card-foreground rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Chapter {chapter}</h2>
      {isLoading && <p className="mb-4">Loading...</p>}
      {isError && <p className="mb-4 text-red-500">Error: {error?.message}</p>}
      {!isLoading && !isError && (
        <div className="mb-4">
          {verses?.map((verse) => (
            <p key={verse.verse_number}>
              <strong>{verse.verse_number}</strong> {verse.text}
            </p>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousChapter}
          disabled={chapter === 1}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextChapter}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Next
        </button>
      </div>
    </div>
  );
}