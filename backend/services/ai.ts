import { createClient } from '@supabase/supabase-js';
import { GeminiClient } from '@google/gemini';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Gemini client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const gemini = new GeminiClient({ apiKey: geminiApiKey });

/**
 * Queries the Supabase Vector database for relevant context based on the input query.
 * @param query - The user's input query.
 * @returns An array of relevant context strings.
 */
async function getRelevantContext(query: string): Promise<string[]> {
  const embeddingResponse = await gemini.generateEmbedding({
    text: query,
  });

  if (!embeddingResponse || !embeddingResponse.embedding) {
    throw new Error('Failed to generate embedding for the query.');
  }

  const embedding = embeddingResponse.embedding;

  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    similarity_threshold: 0.8,
    match_count: 5,
  });

  if (error) {
    throw new Error(`Error querying Supabase: ${error.message}`);
  }

  return data.map((item: { content: string }) => item.content);
}

/**
 * Generates a response using the retrieved context and the user's query.
 * @param query - The user's input query.
 * @returns The AI-generated response.
 */
async function generateResponse(query: string): Promise<string> {
  const context = await getRelevantContext(query);

  const prompt = `
    You are an AI assistant. Use the following context to answer the user's question:
    Context: ${context.join('\\\\n')}
    Question: ${query}
    Answer:
  `;

  const completionResponse = await gemini.generateText({
    prompt,
    maxTokens: 500,
    temperature: 0.7,
  });

  if (!completionResponse || !completionResponse.text) {
    throw new Error('Failed to generate a response.');
  }

  return completionResponse.text.trim();
}

export { getRelevantContext, generateResponse };