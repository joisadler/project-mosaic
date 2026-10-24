import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedbackPrototype } from "./FeedbackPrototype";

export const metadata: Metadata = {
  title: "Отклик — прототип Mosaic",
  robots: { index: false, follow: false },
};

export default function FeedbackPrototypePage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <FeedbackPrototype />;
}
