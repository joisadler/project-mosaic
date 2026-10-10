import { LearningFeed } from "@/components/learning-feed/LearningFeed";
import { learningCards } from "@/content/learning-cards";

export default function Home() {
  return <LearningFeed cards={learningCards} />;
}
