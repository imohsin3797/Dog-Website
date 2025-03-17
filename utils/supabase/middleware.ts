import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create a Supabase client with custom auth storage that reads cookies from the request.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          // Provide custom storage methods so the client can read the auth cookie.
          storage: {
            getItem: (key: string): string | null => {
              // The auth token is expected to be stored under a key (e.g., "sb:token")
              // Adjust the key name as needed based on your Supabase auth configuration.
              return request.cookies.get(key)?.value || null;
            },
            setItem: (_key: string, _value: string): void => {
              // In Edge Middleware we cannot modify the request cookies directly.
              // A full solution would update the response cookies accordingly.
              // This is a no-op for now.
            },
            removeItem: (_key: string): void => {
              // No-op in this simplified example.
            },
          },
          // Since we're handling the cookie manually, disable session persistence.
          persistSession: false,
        },
      }
    );

    // Get the current user session.
    const { data: { user }, error } = await supabase.auth.getUser();

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
    // If an error occurs (for example, missing environment variables), continue with the request.
    return NextResponse.next();
  }
};
