import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

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
  const path = req.nextUrl.pathname;

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

  // Allow public routes, blog posts, static assets, API routes
  if (isPublicRoute || isBlogPost || isStaticAsset || isApiRoute) {
    // Redirect authenticated users away from /login
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
