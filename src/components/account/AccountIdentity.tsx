import styles from "./account-screen.module.scss";

export function AccountIdentity({ name, email, busy, onSignOut }: {
  name: string;
  email: string;
  busy: boolean;
  onSignOut: () => void;
}) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toLocaleUpperCase() || "M";
  return (
    <div className={styles.identity}>
      <div className={styles.avatar} aria-hidden="true">{initials}</div>
      <div className={styles.identityRow}>
        <div className={styles.identityText}>
          <h2>{name}</h2>
          <p className={styles.email}>{email}</p>
        </div>
        <button className={styles.signOut} type="button" disabled={busy} onClick={onSignOut}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M9 4H5v16h4m6-12 4 4-4 4m-6-4h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {busy ? "Выходим…" : "Выйти"}
        </button>
      </div>
    </div>
  );
}
