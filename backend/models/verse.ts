// backend/models/verse.ts
import { z } from "../deps.ts";

const VerseSchema = z.object({
  book: z.string(),
  chapter: z.number(),
  verse: z.number(),
  text: z.string(),
  version: z.string(),
});

type Verse = z.infer<typeof VerseSchema>;
export { VerseSchema, type Verse };
