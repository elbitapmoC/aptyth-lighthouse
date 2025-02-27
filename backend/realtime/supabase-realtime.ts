import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_KEY') || '';

// Validate that the environment variables are set
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_KEY in the environment.');
}

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Initializes a real-time subscription to a specific table in Supabase.
 * @param tableName - The name of the table to subscribe to.
 * @param callback - A function to handle real-time updates.
 */
function subscribeToRealtime(tableName: string, callback: (payload: any) => void) {
  const channel = supabase
    .channel(`realtime:${tableName}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => {
      console.log('Realtime update received:', payload);
      callback(payload);
    })
    .subscribe();

  console.log(`Subscribed to real-time updates on table: ${tableName}`);

  return channel;
}

/**
 * Unsubscribes from a real-time subscription.
 * @param channel - The Supabase channel to unsubscribe from.
 */
async function unsubscribeFromRealtime(channel: any) {
  const { error } = await supabase.removeChannel(channel);

  if (error) {
    console.error('Error unsubscribing from real-time updates:', error.message);
  } else {
    console.log('Successfully unsubscribed from real-time updates.');
  }
}

export { subscribeToRealtime, unsubscribeFromRealtime };
