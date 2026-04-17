import { NextRequest, NextResponse } from "next/server";

function isServerActionPost(request: NextRequest) {
  if (request.method !== "POST") return false;
  const h = request.headers;
  return Boolean(h.get("Next-Action") ?? h.get("next-action"));
}

export default async function middleware(request: NextRequest) {
  if (isServerActionPost(request)) {
    return NextResponse.next();
  }

  const { auth } = await import("@/lib/auth/server");
  
  // Apply middleware and ensure redirection to dashboard after login
  return auth.middleware({ 
    loginUrl: "/auth/sign-in"
  })(request);
}

// Ensure middleware runs only on relevant paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/events/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};