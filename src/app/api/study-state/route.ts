import { requireUser, UnauthenticatedError, UntrustedAuthHostError } from "@/lib/auth/server";
import { readAuthConfig, resolveAuthOrigin } from "@/lib/auth/config";
import { parseSyncBatch } from "@/lib/learning-progress/sync-model";
import { readStudyState, updateStudyState, syncInventory } from "@/lib/learning-progress/server";

export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
const maxBodyBytes = 128 * 1024;

function failure(error: unknown) {
  const status = error instanceof UnauthenticatedError ? 401 : error instanceof UntrustedAuthHostError ? 403 : 503;
  return Response.json({ error: "Study state unavailable" }, { status, headers });
}

export async function GET(request: Request) {
  try {
    const user = await requireUser(request.headers);
    const config = readAuthConfig(process.env);
    if (!config) throw new Error("Unavailable");
    return Response.json({ state: await readStudyState(config, user.id), conflicts: [] }, { headers });
  } catch (error) { return failure(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(request.headers);
    const config = readAuthConfig(process.env);
    if (!config) throw new Error("Unavailable");
    const origin = resolveAuthOrigin(config, request.headers);
    if (!origin || request.headers.get("origin") !== origin || request.headers.get("sec-fetch-site") === "cross-site")
      return Response.json({ error: "Forbidden" }, { status: 403, headers });
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")
      return Response.json({ error: "JSON required" }, { status: 415, headers });
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: "Invalid data" }, { status: 400, headers });
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) { await reader.cancel(); return Response.json({ error: "Request too large" }, { status: 413, headers }); }
      chunks.push(value);
    }
    let batch;
    try { batch = parseSyncBatch(JSON.parse(Buffer.concat(chunks).toString("utf8")), syncInventory); }
    catch { return Response.json({ error: "Invalid data" }, { status: 400, headers }); }
    return Response.json(await updateStudyState(config, user.id, batch), { headers });
  } catch (error) { return failure(error); }
}
