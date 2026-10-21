import type { ReactNode } from "react";
import { StudyShell } from "@/components/study-shell/StudyShell";
import { readAuthConfig } from "@/lib/auth/config";
import { learningCards } from "@/content/learning-cards";

export default function StudyLayout({ children }: { children: ReactNode }) {
  let authConfigured = false;
  try { authConfigured = readAuthConfig(process.env) !== null; } catch { /* Keep guest study available. */ }
  return <StudyShell cards={learningCards} authConfigured={authConfigured}>{children}</StudyShell>;
}
