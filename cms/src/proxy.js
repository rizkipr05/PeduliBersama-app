import { NextResponse } from "next/server";

// Auth is handled client-side via AuthGuard component (localStorage-based).
// This proxy only passes requests through without blocking.
export function proxy() {
  return NextResponse.next();
}

