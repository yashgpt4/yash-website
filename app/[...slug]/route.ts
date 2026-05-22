/**
 * Catch-all route handler that serves index.html for the 7 tab routes.
 *
 * Why a route handler (not a page)?
 * - Route handlers return raw HTTP responses — no React layout wrapping.
 * - The full index.html (with its inline CSS + JS) is returned as-is,
 *   so the JS on the page can read window.location.pathname and switch
 *   to the correct tab (portfolio, about, etc.) without any redirect.
 *
 * Route specificity: Next.js resolves more-specific routes first,
 * so /notes/[slug] (app/notes/[slug]/page.tsx) still takes precedence
 * over this catch-all for paths under /notes/.
 */

import { readFile } from 'fs/promises'
import { join } from 'path'

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
  _request: Request,
  { params }: { params: { slug: string[] } }
) {
  const [firstSegment] = params.slug

  if (TAB_ROUTES.has(firstSegment)) {
    const html = await readFile(join(process.cwd(), 'index.html'), 'utf-8')
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  return new Response('Not Found', { status: 404 })
}
