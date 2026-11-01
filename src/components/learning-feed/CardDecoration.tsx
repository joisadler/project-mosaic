import type { LearningCardData } from "@/content/card-types";
import { getCardPresentation } from "./section-presentation";
import styles from "./section-presentation.module.scss";

// Static peripheral artwork; the same composition is used on every page and side.
const artwork = {
  scope: <>
    <rect x="85" y="75" width="290" height="290" rx="44" />
    <rect x="140" y="130" width="235" height="235" rx="32" />
    <path d="M205 185h-16q-16 0-16 20v24q0 18-18 18 18 0 18 18v24q0 20 16 20h16M285 185h16q16 0 16 20v24q0 18 18 18-18 0-18 18v24q0 20-16 20h-16" />
  </>,
  lifecycle: <>
    <path d="M70 400V70q0-30 30-30h300M120 400V120q0-30 30-30h250" />
    <rect x="45" y="275" width="50" height="62" rx="12" />
    <rect x="45" y="165" width="50" height="62" rx="12" />
    <rect x="45" y="55" width="50" height="62" rx="12" />
    <path d="m62 249 8-9 8 9m-16-110 8-9 8 9" />
  </>,
  values: <>
    <circle cx="285" cy="110" r="90" />
    <rect x="40" y="115" width="135" height="135" rx="30" transform="rotate(-18 108 183)" />
    <path d="m240 240 90 65-90 65-90-65Z" />
    <circle cx="285" cy="110" r="65" />
  </>,
  equality: <>
    <circle cx="105" cy="255" r="80" />
    <circle cx="335" cy="255" r="80" />
    <path d="M205 240h30m-30 30h30M25 355h390" />
    <circle cx="105" cy="255" r="55" />
    <circle cx="335" cy="255" r="55" />
  </>,
  conversion: <>
    <rect x="30" y="40" width="100" height="100" rx="22" />
    <path d="M80 140v65q0 40 40 40h125m-18-18 18 18-18 18M130 90h170q40 0 40 40v60" />
    <circle cx="310" cy="245" r="65" />
    <path d="m322 172 18 18 18-18M310 310v90" />
  </>,
  capture: <>
    <path d="M380 65H205a115 115 0 0 0 0 230h175M380 110H210a70 70 0 0 0 0 140h170M50 95h60v85h75M50 300h60V180" />
    <circle cx="50" cy="95" r="22" />
    <circle cx="50" cy="300" r="22" />
    <circle cx="210" cy="180" r="25" />
  </>,
  invocation: <>
    <circle cx="290" cy="180" r="70" />
    <circle cx="290" cy="180" r="40" />
    <path d="M15 60h90q35 0 35 35v55q0 30 30 30h50M15 300h90q35 0 35-35v-55q0-30 30-30M25 180h195m-18-18 18 18-18 18M290 250v140" />
  </>,
  composition: <>
    <rect x="20" y="265" width="80" height="80" rx="18" />
    <rect x="160" y="155" width="80" height="80" rx="18" />
    <rect x="300" y="45" width="80" height="80" rx="18" />
    <path d="M100 305h45q55 0 55-55v-15m-14 14 14-14 14 14M240 195h45q55 0 55-55v-15m-14 14 14-14 14 14" />
  </>,
  prototype: <>
    <rect x="185" y="65" width="165" height="82" rx="17" />
    <rect x="120" y="205" width="165" height="82" rx="17" />
    <rect x="40" y="340" width="165" height="82" rx="17" />
    <path d="M205 205v-27q0-25 25-25h37v-6m-10 10 10-10 10 10M120 340v-27q0-25 25-25h56m-10-10 10 10-10 10" />
  </>,
  descriptor: <>
    <rect x="150" y="125" width="225" height="240" rx="22" />
    <path d="M150 185h225M225 185v180M300 185v180M150 245h225M150 305h225" />
    <rect x="185" y="145" width="90" height="18" rx="8" />
  </>,
  interception: <>
    <rect x="155" y="90" width="220" height="285" rx="28" />
    <rect x="210" y="145" width="110" height="175" rx="19" />
    <path d="M30 230h80q25 0 25-25v-40q0-25 25-25h80m-12-12 12 12-12 12M265 320v55m-12-12 12 12 12-12" />
  </>,
  neutral: <circle cx="290" cy="290" r="150" />,
};

export function CardDecoration({ card }: { card: LearningCardData }) {
  const { motif } = getCardPresentation(card);

  return (
    <svg
      className={styles.decoration}
      data-motif={motif}
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {artwork[motif]}
    </svg>
  );
}
