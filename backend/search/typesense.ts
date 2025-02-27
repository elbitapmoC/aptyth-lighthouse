import { Client } from 'typesense';

// Retrieve Typesense credentials from environment variables
const typesenseHost = Deno.env.get('TYPESENSE_HOST') || '';
const typesensePort = Deno.env.get('TYPESENSE_PORT') || '';
const typesenseProtocol = Deno.env.get('TYPESENSE_PROTOCOL') || 'http';
const typesenseApiKey = Deno.env.get('TYPESENSE_API_KEY') || '';

// Validate that the environment variables are set
if (!typesenseHost || !typesensePort || !typesenseApiKey) {
  throw new Error(
    'Missing Typesense configuration. Please set TYPESENSE_HOST, TYPESENSE_PORT, and TYPESENSE_API_KEY in the environment.'
  );
}

// Create and export the Typesense client
const typesense = new Client({
  nodes: [
    {
      host: typesenseHost,
      port: parseInt(typesensePort, 10),
      protocol: typesenseProtocol,
    },
  ],
  apiKey: typesenseApiKey,
  connectionTimeoutSeconds: 2,
});

export default typesense;
