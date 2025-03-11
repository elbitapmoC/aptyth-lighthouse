import type { Context } from "../deps.ts";

//Success
export const success = (
  c: Context,
  message: string,
  data?: any,
  status = 200
) => {
  return c.json(
    {
      success: true,
      message,
      data,
    },
    status
  );
};

// Error
export const error = (
  c: Context,
  message: string,
  error?: any,
  status = 500
) => {
  return c.json(
    {
      success: false,
      message,
      error,
    },
    status
  );
};
