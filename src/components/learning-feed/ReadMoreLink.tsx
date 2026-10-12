import type { SyntheticEvent } from "react";
import { getSafeReadMoreUrl } from "./read-more-url";
import styles from "./learning-feed.module.scss";

type ReadMoreLinkProps = {
  url?: string;
};

const accessibleName = "Читать подробнее — откроется в новой вкладке";

function stopGesturePropagation(event: SyntheticEvent) {
  event.stopPropagation();
}

export function ReadMoreLink({ url }: ReadMoreLinkProps) {
  const safeUrl = getSafeReadMoreUrl(url);

  if (!safeUrl) {
    return null;
  }

  return (
    <a
      className={`${styles.readMoreLink} swiper-no-swiping`}
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleName}
      data-tooltip="Читать подробнее"
      data-swiper-no-swiping="true"
      draggable={false}
      onClick={stopGesturePropagation}
      onPointerDown={stopGesturePropagation}
      onTouchStart={stopGesturePropagation}
    >
      <svg
        className={styles.readMoreIcon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 5.5c2.7-.6 5.4.1 8 2.1 2.6-2 5.3-2.7 8-2.1v12.8c-2.7-.6-5.4.1-8 2.1-2.6-2-5.3-2.7-8-2.1V5.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7.6v12.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}
