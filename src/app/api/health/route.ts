import { NextResponse } from "next/server";

/**
 * GET /api/health
 * A simple health check endpoint.
 * Use this pattern for any server-side API route you need.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
