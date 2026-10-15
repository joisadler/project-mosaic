import { requireUser, UnauthenticatedError, UntrustedAuthHostError } from "@/lib/auth/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const user = await requireUser(request.headers);
    return Response.json({ user }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof UnauthenticatedError ? 401 :
      error instanceof UntrustedAuthHostError ? 403 : 503;
    return Response.json({ user: null }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
