import manifest from "../manifest";

export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.MOSAIC_AUTH_ENV !== "development") {
    return new Response(null, { status: 404 });
  }
  return Response.json({
    ...manifest(),
    id: "/dev-auth",
    name: "Mosaic Dev",
    short_name: "Mosaic Dev",
    start_url: "/sign-in",
  }, { headers: { "Content-Type": "application/manifest+json", "Cache-Control": "no-store" } });
}
