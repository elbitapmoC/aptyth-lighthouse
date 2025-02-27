import { Pool } from 'pg';
import mysql from 'mysql2/promise';

// Retrieve Postgres credentials from environment variables
const postgresConfig = {
  user: Deno.env.get('POSTGRES_USER') || '',
  host: Deno.env.get('POSTGRES_HOST') || '',
  database: Deno.env.get('POSTGRES_DB') || '',
  password: Deno.env.get('POSTGRES_PASSWORD') || '',
  port: parseInt(Deno.env.get('POSTGRES_PORT') || '5432', 10),
};

// Validate that the Postgres environment variables are set
if (!postgresConfig.user || !postgresConfig.host || !postgresConfig.database || !postgresConfig.password) {
  throw new Error('Missing Postgres configuration. Please set POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, and POSTGRES_PASSWORD in the environment.');
}

// Create a Postgres connection pool
const postgresPool = new Pool(postgresConfig, 10); // Limit to 10 connections

// Retrieve MySQL credentials from environment variables
const mysqlConfig = {
  host: Deno.env.get('MYSQL_HOST') || '',
  user: Deno.env.get('MYSQL_USER') || '',
  password: Deno.env.get('MYSQL_PASSWORD') || '',
  database: Deno.env.get('MYSQL_DB') || '',
  port: parseInt(Deno.env.get('MYSQL_PORT') || '3306', 10),
};

// Validate that the MySQL environment variables are set
if (!mysqlConfig.host || !mysqlConfig.user || !mysqlConfig.password || !mysqlConfig.database) {
  throw new Error('Missing MySQL configuration. Please set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DB in the environment.');
}

// Create a MySQL connection pool
const mysqlPool = mysql.createPool({
  ...mysqlConfig,
  waitForConnections: true,
  connectionLimit: 10, // Limit to 10 connections
  queueLimit: 0,
});

/**
 * Get a Postgres client from the pool.
 * @returns A Postgres client.
 */
export async function getPostgresClient() {
  const client = await postgresPool.connect();
  return client;
}

/**
 * Get a MySQL connection from the pool.
 * @returns A MySQL connection.
 */
export async function getMysqlConnection() {
  const connection = await mysqlPool.getConnection();
  return connection;
}

/**
 * Close all database connections gracefully.
 */
export async function closePools() {
  await postgresPool.end();
  await mysqlPool.end();
}

export { postgresPool, mysqlPool };
