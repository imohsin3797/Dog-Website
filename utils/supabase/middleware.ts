// middleware.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  try {
    // Create a Supabase client with custom auth storage that reads cookies from the request.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          storage: {
            getItem: (key: string): string | null =>
              request.cookies.get(key)?.value || null,
            setItem: (_key: string, _value: string): void => {
              // Not supported in Edge Middleware.
            },
            removeItem: (_key: string): void => {
              // Not supported in Edge Middleware.
            },
          },
          persistSession: false,
        },
      }
    );

    // Get the current user session.
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    let response = NextResponse.next();

    // If on a protected route and there's no valid session, redirect to the sign-in page.
    if (request.nextUrl.pathname.startsWith("/protected") && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If at the root path and a valid session exists, redirect to /protected.
    if (request.nextUrl.pathname === "/" && !error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    // If an error occurs, continue with the request.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
