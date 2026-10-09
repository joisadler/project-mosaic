import { LearningFeed } from "@/components/learning-feed/LearningFeed";
import { infoCards } from "@/content/info-cards";

export default function Home() {
  return <LearningFeed cards={infoCards} />;
}
