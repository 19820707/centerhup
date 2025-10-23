import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Redirecionar / para /pt-PT
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pt-PT', req.url));
  }
}

export const config = { 
  matcher: '/' 
};
