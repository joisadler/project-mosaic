import type { Metadata } from "next";
import { AccountScreen } from "@/components/account/AccountScreen";
import { FeedbackSettings } from "@/components/interaction-feedback/FeedbackSettings";
import styles from "@/components/account/account-screen.module.scss";

export const metadata: Metadata = { title: "Настройки — Mosaic" };

export default function SettingsPage() {
  return (
    <AccountScreen titleId="settings-title" showProfileLink>
      <header className={styles.heading}>
        <h1 id="settings-title" data-screen-heading tabIndex={-1}>Настройки</h1>
        <p className={styles.description}>Сделай обучение удобным для себя.</p>
      </header>
      <FeedbackSettings />
    </AccountScreen>
  );
}
