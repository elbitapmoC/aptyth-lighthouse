import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "@serwist/next";

// Middleware to protect routes and check authentication
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token using the secret key
    const user = await verify(token, process.env.JWT_SECRET!);

    // Attach the user to the request for further use
    request.headers.set("user", JSON.stringify(user));
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Define the routes where the middleware should apply
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
