"use client";

import React, { useState } from "react";

export default function BibleReader() {
  const [chapter, setChapter] = useState(1);
  const [content, setContent] = useState("Loading...");

  const fetchChapter = async (chapterNumber: number) => {
    // Simulate fetching chapter content
    const simulatedContent = `This is the content of chapter ${chapterNumber}.`;
    setContent(simulatedContent);
  };

  const handleNextChapter = () => {
    const nextChapter = chapter + 1;
    setChapter(nextChapter);
    fetchChapter(nextChapter);
  };

  const handlePreviousChapter = () => {
    if (chapter > 1) {
      const previousChapter = chapter - 1;
      setChapter(previousChapter);
      fetchChapter(previousChapter);
    }
  };

  React.useEffect(() => {
    fetchChapter(chapter);
  }, [chapter]);

  return (
    <div className="p-4 bg-card text-card-foreground rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Chapter {chapter}</h2>
      <p className="mb-4">{content}</p>
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
