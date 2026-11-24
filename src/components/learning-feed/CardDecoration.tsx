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
  slots: <>
    <rect x="90" y="240" width="70" height="70" rx="14" />
    <rect x="180" y="240" width="70" height="70" rx="14" strokeDasharray="5 7" />
    <rect x="270" y="240" width="70" height="70" rx="14" />
    <path d="M40 340h335m-250-18v36m90-36v36m90-36v36" />
  </>,
  transformation: <>
    <rect x="160" y="80" width="48" height="48" rx="10" />
    <rect x="225" y="80" width="48" height="48" rx="10" />
    <rect x="290" y="80" width="48" height="48" rx="10" />
    <path d="M315 145v45H125v45m-12-12 12 12 12-12" />
    <rect x="65" y="265" width="48" height="48" rx="10" />
    <rect x="130" y="265" width="48" height="48" rx="10" />
    <rect x="195" y="265" width="48" height="48" rx="10" />
  </>,
  sharing: <>
    <rect x="65" y="125" width="100" height="60" rx="14" />
    <rect x="245" y="125" width="100" height="60" rx="14" />
    <path d="M115 185v55l90 55m90-110v55l-90 55" />
    <rect x="170" y="295" width="70" height="50" rx="12" />
  </>,
  entries: <>
    <rect x="155" y="160" width="65" height="45" rx="12" />
    <rect x="285" y="160" width="65" height="45" rx="12" />
    <rect x="155" y="240" width="65" height="45" rx="12" />
    <rect x="285" y="240" width="65" height="45" rx="12" />
    <rect x="155" y="320" width="65" height="45" rx="12" />
    <rect x="285" y="320" width="65" height="45" rx="12" />
    <path d="M220 182h65m-65 80h65m-65 80h65" />
  </>,
  tokens: <>
    <path d="M230 160h85l35 35v105l-35 35h-85l-35-35V195l35-35Z" />
    <path d="M180 210h85l35 35v105l-35 35h-85l-35-35V245l35-35Z" strokeDasharray="5 7" />
    <path d="M230 160v25h25m-75 25v25h25" />
  </>,
  cursor: <>
    <path d="m40 330 130-55m65-28 125-55" strokeDasharray="3 10" />
    <circle cx="202" cy="261" r="30" />
    <path d="m350 185 16 4-7 15" />
  </>,
  boundary: <>
    <path d="M110 170h60l20 20v125h-80Zm60 0v20h20M250 145h60l20 20v150h-80Zm60 0v20h20" />
    <path d="M190 240h60" />
    <circle cx="190" cy="240" r="6" />
    <circle cx="250" cy="240" r="6" />
  </>,
  causes: <>
    <rect x="135" y="150" width="115" height="50" rx="10" />
    <rect x="180" y="225" width="115" height="50" rx="10" />
    <rect x="225" y="300" width="115" height="50" rx="10" />
    <path d="M195 200v15h45v10m0 50v15h45v10" strokeDasharray="3 5" />
  </>,
  payload: <>
    <path d="M160 190h-15v35l-12 12 12 12v35h15m20-94h15v35l12 12-12 12v35h-15m40-47h30m-8-8 8 8-8 8" />
    <rect x="270" y="160" width="80" height="150" rx="10" />
    <path d="M285 185h50m-50 25h33m-33 25h46m-46 25h33m-33 25h45" />
  </>,
  reachability: <>
    <rect x="103" y="225" width="58" height="58" rx="14" />
    <rect x="198" y="225" width="58" height="58" rx="14" />
    <rect x="293" y="225" width="58" height="58" rx="14" />
    <rect x="198" y="312" width="58" height="58" rx="14" strokeDasharray="5 7" />
    <path d="M161 254h37m-9-8 9 8-9 8M256 254h37m-9-8 9 8-9 8" />
  </>,
  queue: <>
    <path d="M155 227h223M155 319h223" />
    <rect x="169" y="246" width="54" height="54" rx="10" />
    <rect x="238" y="246" width="54" height="54" rx="10" />
    <rect x="307" y="246" width="54" height="54" rx="10" strokeDasharray="5 7" />
  </>,
  deadline: <>
    <path d="M145 272h171m-137-18v36m57-36v36" />
    <circle cx="334" cy="272" r="18" />
  </>,
  frame: <>
    <rect x="173" y="200" width="156" height="102" rx="14" />
    <rect x="203" y="229" width="156" height="102" rx="14" />
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
