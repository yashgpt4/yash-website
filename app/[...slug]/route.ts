/**
 * Catch-all route handler that serves index.html for the 7 tab routes.
 *
 * Why a route handler (not a page)?
 * - Route handlers return raw HTTP responses — no React layout wrapping.
 * - The full index.html (with its inline CSS + JS) is returned as-is,
 *   so the JS on the page can read window.location.pathname and switch
 *   to the correct tab (portfolio, about, etc.) without any redirect.
 *
 * Why fetch instead of fs.readFile?
 * - Vercel Lambdas do NOT bundle project-root files (like index.html) into
 *   the serverless function. fs.readFile would always fail with ENOENT.
 * - public/ files ARE served by Vercel's CDN edge layer, separately from
 *   the Lambda. Fetching /index.html from within the Lambda hits the CDN
 *   directly — it never re-enters this route handler (public/ has priority
 *   over App Router routes for that exact path).
 *
 * Route specificity: Next.js resolves more-specific routes first,
 * so /notes/[slug] (app/notes/[slug]/page.tsx) still takes precedence
 * over this catch-all for paths under /notes/.
 */

export const dynamic = 'force-dynamic'

const TAB_ROUTES = new Set([
  'about',
  'portfolio',
  'principles',
  'blog',
  'sakura',
  'inspo',
  'entrepreneurship',
])

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const [firstSegment] = params.slug

  if (TAB_ROUTES.has(firstSegment)) {
    // Fetch index.html from the CDN (public/index.html).
    // public/ assets are served at the edge before any Lambda is invoked,
    // so this fetch resolves instantly from the CDN — no infinite loop.
    const origin = new URL(request.url).origin
    const res = await fetch(`${origin}/index.html`)

    if (!res.ok) {
      return new Response('index.html not found', { status: 502 })
    }

    const html = await res.text()
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not Found', { status: 404 })
}
