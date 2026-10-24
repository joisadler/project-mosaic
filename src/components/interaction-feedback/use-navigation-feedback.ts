"use client";

import { useEffect, useState } from "react";
import { createNavigationFeedbackGate } from "@/lib/interaction-feedback/navigation";

export function useNavigationFeedback(active: boolean) {
  const [gate] = useState(createNavigationFeedbackGate);
  useEffect(() => () => gate.cancel(), [gate]);
  useEffect(() => { if (!active) gate.cancel(); }, [active, gate]);
  return gate;
}
