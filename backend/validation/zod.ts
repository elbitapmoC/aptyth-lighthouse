import { z } from 'zod';

// Define a schema for user registration
export const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(20, { message: 'Username must not exceed 20 characters.' }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
});

// Define a schema for user login
export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

// Define a schema for creating a new todo item
export const todoSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Title must not exceed 100 characters.' }),
  completed: z
    .boolean()
    .optional(),
});

// Define a schema for pagination parameters
export const paginationSchema = z.object({
  page: z
    .number()
    .int()
    .min(1, { message: 'Page must be at least 1.' }),
  limit: z
    .number()
    .int()
    .min(1, { message: 'Limit must be at least 1.' })
    .max(100, { message: 'Limit must not exceed 100.' }),
});

// Define a schema for updating user profile
export const userProfileUpdateSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(20, { message: 'Username must not exceed 20 characters.' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .optional(),
  bio: z
    .string()
    .max(500, { message: 'Bio must not exceed 500 characters.' })
    .optional(),
});

// Export a utility function to validate data against a schema
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      result.error.errors.map((err) => err.message).join(', ')
    );
  }
  return result.data;
}
