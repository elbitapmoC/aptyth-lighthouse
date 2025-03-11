import { getVerse } from "../db/queries.ts";
// backend/api/bible.ts
import { Hono } from "../deps.ts";
import { z } from "../deps.ts";

const app = new Hono();

// --- Get Single Verse ---
// Define Zod schema.
const VerseParamsSchema = z.object({
  version: z.string(),
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
});
app.get("/:version/:book/:chapter/:verse", async (c) => {
  //   const { version, book, chapter, verse } = c.req.param();
  // Parse params using Zod.
  const result = VerseParamsSchema.safeParse(c.req.param());

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  const { version, book, chapter, verse } = result.data;
  const chapterNumber = Number.parseInt(chapter, 10);
  const verseNumber = Number.parseInt(verse, 10);

  if (isNaN(chapterNumber) || isNaN(verseNumber)) {
    return c.json({ error: "Invalid chapter or verse number" }, 400);
  }

  const verseData = await getVerse(version, book, chapterNumber, verseNumber);

  if (!verseData) {
    return c.json({ error: "Verse not found" }, 404);
  }

  return c.json(verseData);
});

export default app;
