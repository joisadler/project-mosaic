import Image from "next/image";
import { useId } from "react";

export function MosaicTiles({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 240 260" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-lilac`} x1="75" y1="5" x2="200" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BEA4FF" /><stop offset=".55" stopColor="#9979F0" /><stop offset="1" stopColor="#6778DD" />
        </linearGradient>
        <linearGradient id={`${id}-cyan`} x1="10" y1="110" x2="140" y2="245" gradientUnits="userSpaceOnUse">
          <stop stopColor="#91E7F0" /><stop offset=".6" stopColor="#6BC9E7" /><stop offset="1" stopColor="#839DF1" />
        </linearGradient>
        <linearGradient id={`${id}-peach`} x1="160" y1="190" x2="220" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD0AC" /><stop offset="1" stopColor="#E8A18C" />
        </linearGradient>
      </defs>
      <g transform="rotate(34 120 130)">
        <rect x="80" y="-5" width="128" height="128" rx="24" fill={`url(#${id}-lilac)`} />
        <rect x="19" y="139" width="100" height="100" rx="20" fill={`url(#${id}-cyan)`} />
        <rect x="223" y="56" width="94" height="94" rx="20" fill={`url(#${id}-cyan)`} />
        <rect x="155" y="165" width="59" height="59" rx="14" fill={`url(#${id}-peach)`} />
      </g>
    </svg>
  );
}

export function MosaicMark() {
  return <Image src="/icons/mosaic-mark.svg" width={32} height={32} alt="" aria-hidden="true" unoptimized />;
}

export function LearningSymbol() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="7" y="8" width="29" height="29" rx="7" transform="rotate(35 21.5 22.5)" fill="#B7A0FF" />
      <rect x="30" y="31" width="27" height="27" rx="7" transform="rotate(35 43.5 44.5)" fill="#85DEED" />
    </svg>
  );
}

export function ReviewSymbol() {
  // One filled contour joins the arc and arrowhead without overlapping stroke caps.
  const arrow = "M9.92 40.04A23.5 23.5 0 0 1 40.8 10.21L42.49 6.04L48.76 17.21L36.49 20.88L38.18 16.7A16.5 16.5 0 0 0 16.49 37.64A3.5 3.5 0 0 1 9.92 40.04Z";
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <path d={arrow} fill="#85DEED" />
      <path d={arrow} transform="rotate(180 32 32)" fill="#B7A0FF" />
    </svg>
  );
}

export function ResetSymbol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20 10a8 8 0 1 0-2 8M20 4v6h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShuffleSymbol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 6h3c4 0 8 12 12 12h3m-4-4 4 4-4 4M3 18h3c1.5 0 3-2 4-4m4-4c1.5-2 2.5-4 4-4h3m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InfoSymbol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v6m0-10v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
