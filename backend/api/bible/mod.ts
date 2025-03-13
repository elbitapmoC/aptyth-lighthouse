import { getVerse } from "../../db/queries.ts";
// backend/api/bible/mod.ts
import { Hono } from "../../deps.ts";
import { z } from "../../deps.ts";
import { isValidVerse } from "../../utils/bibleUtils.ts";
import { error } from "../../utils/response.ts";

const app = new Hono();

// --- Supported Bible Versions (Example - Expand as needed) ---
const supportedVersions = ["KJV", "NIV", "ESV", "NLT", "NASB"];

// --- Valid Book Names (Example - This should be comprehensive!) ---
const validBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

// --- Zod Schema with Enhanced Validation ---
const VerseParamsSchema = z.object({
  version: z.string().refine((v) => supportedVersions.includes(v), {
    message: "Unsupported Bible version",
  }),
  book: z.string().refine((b) => validBooks.includes(b), {
    message: "Invalid book name",
  }),
  chapter: z.string(), // Keep as strings for initial parsing
  verse: z.string(), // Keep as strings for initial parsing
});

app.get("/:version/:book/:chapter/:verse", async (c) => {
  const result = VerseParamsSchema.safeParse(c.req.param());

  if (!result.success) {
    return error(c, "Validation Error", result.error, 400);
  }

  const { version, book, chapter, verse } = result.data;

  const chapterNumber = Number.parseInt(chapter, 10);
  const verseNumber = Number.parseInt(verse, 10);

  if (Number.isNaN(chapterNumber) || Number.isNaN(verseNumber)) {
    return error(c, "Invalid chapter or verse number.", undefined, 400);
  }

  // --- USE THE HELPER FUNCTION ---
  if (!isValidVerse(book, chapterNumber, verseNumber)) {
    return error(
      c,
      "Invalid chapter or verse number for this book.",
      undefined,
      400
    );
  }

  const verseData = await getVerse(version, book, chapterNumber, verseNumber);

  if (!verseData) {
    return error(c, "Verse not found.", undefined, 404);
  }

  return c.json(verseData);
});

export default app;
