import "server-only";
import { MongoServerError } from "mongodb";
import { learningSections, learningSectionIdByCardId } from "@/content/learning-sections";
import { getAuthDatabase } from "@/lib/auth/database";
import type { AuthConfig } from "@/lib/auth/config";
import { applySyncBatch, initialCloudState, type CloudState, type SyncBatch } from "./sync-model";

export const syncInventory = {
  sections: learningSections.map(section => section.id),
  cardSections: learningSectionIdByCardId,
};

async function collection(config: AuthConfig) {
  const { db } = await getAuthDatabase(config);
  return db.collection<{ _id: string; state: CloudState }>("studyState");
}

export async function readStudyState(config: AuthConfig, userId: string) {
  const states = await collection(config);
  try {
    await states.updateOne({ _id: userId }, { $setOnInsert: { state: initialCloudState(syncInventory.sections) } }, { upsert: true });
  } catch (error) {
    if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
  }
  const document = await states.findOne({ _id: userId });
  if (!document) throw new Error("Study state unavailable");
  return document.state;
}

export async function updateStudyState(config: AuthConfig, userId: string, batch: SyncBatch) {
  const states = await collection(config);
  for (let attempt = 0; attempt < 8; attempt++) {
    const current = await readStudyState(config, userId);
    const result = applySyncBatch(current, batch);
    if (result.state.revision === current.revision) return result;
    const document = await states.findOneAndUpdate(
      { _id: userId, "state.revision": current.revision },
      { $set: { state: result.state } },
      { returnDocument: "after" },
    );
    if (document) return { state: document.state, conflicts: result.conflicts };
  }
  throw new Error("Study state busy");
}
