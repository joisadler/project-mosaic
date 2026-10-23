import type { Metadata } from "next";
import { AccountScreen } from "@/components/account/AccountScreen";
import { SectionSelection } from "@/components/account/SectionSelection";
import { StudySessionControl } from "@/components/account/StudySessionControl";
import styles from "@/components/account/account-screen.module.scss";

export const metadata: Metadata = { title: "Моё обучение — Mosaic" };

export default function LearningPage() {
  return (
    <AccountScreen titleId="learning-title" showProfileLink>
      <header className={styles.heading}>
        <h1 id="learning-title" data-screen-heading tabIndex={-1}>Моё обучение</h1>
        <p className={styles.description}>Выбирайте темы и следите за своим прогрессом.</p>
      </header>
      <SectionSelection />
      <StudySessionControl />
    </AccountScreen>
  );
}
