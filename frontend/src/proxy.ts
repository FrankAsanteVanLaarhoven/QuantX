import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. quantxos.com, iqxos.com, localhost:3000)
  const hostname = req.headers.get('host') || 'localhost:3000';

  // Domain routing logic
  if (url.pathname === '/') {
    // Default localhost to matrix since that is where active development occurs
    if (hostname.includes('iqxos.com') || hostname.includes('localhost')) {
        url.pathname = '/matrix';
        return NextResponse.rewrite(url);
    } else if (hostname.includes('quantxos.com')) {
        url.pathname = '/corporate';
        return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
