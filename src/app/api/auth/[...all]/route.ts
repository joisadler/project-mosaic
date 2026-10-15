import { getAuth, UntrustedAuthHostError } from "@/lib/auth/server";

async function handle(request: Request) {
  try {
    const auth = await getAuth(request.headers);
    return await auth.handler(request);
  } catch (error) {
    const status = error instanceof UntrustedAuthHostError ? 403 : 503;
    return Response.json({ message: "Authentication is unavailable. Please try again later." }, {
      status, headers: { "Cache-Control": "no-store" },
    });
  }
}

export const runtime = "nodejs";
export const GET = handle;
export const POST = handle;
