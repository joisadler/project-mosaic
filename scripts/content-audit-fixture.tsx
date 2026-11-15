"use client";

// Temporary route host: re-export this component from a local audit page only.
// Remove that route before the final build. This fixture writes no study data.
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { learningSections } from "@/content/learning-sections";
import { InfoCard } from "@/components/learning-feed/InfoCard";
import { QuizCard } from "@/components/learning-feed/QuizCard";
import { FlipCard, type FlipSideIndex } from "@/components/learning-feed/FlipCard";
import { ReadMoreLink } from "@/components/learning-feed/ReadMoreLink";
import { AccountLink } from "@/components/learning-feed/AccountLink";
import styles from "@/components/learning-feed/learning-feed.module.scss";

const noop = () => {};
export default function ContentAuditFixture() {
  const params = useSearchParams();
  const card = learningSections.flatMap(section => [...section.cards]).find(item => item.id === params.get("card"));
  const [page, setPage] = useState(Number(params.get("page") ?? 0));
  const [side, setSide] = useState<FlipSideIndex>(params.get("side") === "1" ? 1 : 0);
  const [option, setOption] = useState<string | undefined>(params.get("option") ?? undefined);
  if (!card) return <p>Unknown audit card.</p>;
  const progress = { value: 0, ready: true };
  const common = { cardIndex: 0, cardCount: 1, progress, isActive: true };
  return <main className={styles.feedShell} data-audit-card={card.id} data-audit-page={page} data-audit-side={side} data-audit-option={option ?? "none"}>
    {card.type === "info" ? <InfoCard {...common} card={card} activePage={page} onPageNavigation={noop} onPageChange={(_, value) => setPage(value)} />
      : card.type === "quiz" ? <QuizCard {...common} card={card} selectedOptionId={option} onPageNavigation={noop} onFeedbackReview={noop} onOptionSelect={(_, value) => setOption(value)} />
      : <FlipCard {...common} card={card} activeSide={side} onSideNavigation={noop} onSideChange={(_, value) => setSide(value)} />}
    <div className={styles.actionRail}>
      <button className={styles.feedAction} aria-label="Понятно" type="button">✓</button>
      <ReadMoreLink url={card.readMoreUrl} />
      <AccountLink />
    </div>
  </main>;
}
