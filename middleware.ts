import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // If authenticated, fetch profile and set user info in headers
  if (user) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, full_name, role, avatar_url")
        .eq("id", user.id)
        .single();

      if (profile) {
        res.headers.set("x-user-id", profile.id);
        res.headers.set("x-user-email", profile.email || "");
        res.headers.set("x-user-name", profile.full_name || "");
        res.headers.set("x-user-role", profile.role || "client");
        if (profile.avatar_url) {
          res.headers.set("x-user-avatar", profile.avatar_url);
        }
      }
    } catch {
      // Fallback to user_metadata
      res.headers.set("x-user-id", user.id);
      res.headers.set("x-user-email", user.email || "");
      res.headers.set("x-user-name", user.user_metadata?.full_name || "");
      res.headers.set("x-user-role", user.user_metadata?.role || "client");
    }
  }

  // Public routes
  const publicRoutes = [
    "/",
    "/login",
    "/products",
    "/services",
    "/case-studies",
    "/blog",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/refund",
  ];

  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/" && path === "/") return true;
    if (route === "/blog" && path === "/blog") return true;
    return path === route;
  });

  const isBlogPost = /^\/blog\/[^/]+$/.test(path);
  const isStaticAsset = /\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/.test(path);
  const isApiRoute = path.startsWith("/api/");

  if (isPublicRoute || isBlogPost || isStaticAsset || isApiRoute) {
    if (user && path === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return res;
  }

  // Protect dashboard routes
  if (path.startsWith("/dashboard")) {
    if (!user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/((?!api/chat|api/contact|_next/static|_next/image|favicon.ico).*)"],
};
