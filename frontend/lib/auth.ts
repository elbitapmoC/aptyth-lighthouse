// Authentication utilities for the frontend

// Define types for auth functions
interface UserRegistrationData {
  email: string;
  password: string;
  name: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

// Function to register a new user
export async function registerUser(userData: UserRegistrationData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  const data = await response.json();

  // Store token in localStorage
  localStorage.setItem("authToken", data.token);

  return data;
}

// Function to log in a user
export async function loginUser(credentials: UserCredentials) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  const data = await response.json();

  // Store token in localStorage
  localStorage.setItem("authToken", data.token);

  return data;
}

// Function to get the current user
export async function getCurrentUser() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Function to log out
export function logoutUser() {
  localStorage.removeItem("authToken");
  // Optionally call the logout endpoint
  // fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, { method: 'POST' });
}

// Helper to get auth token
export function getAuthToken() {
  return localStorage.getItem("authToken");
}
