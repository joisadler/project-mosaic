import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import styles from "./learning-feed.module.scss";

const markdownComponents: Components = {
  img({ src, alt }) {
    if (typeof src !== "string") {
      return null;
    }

    return (
      <Image
        className={styles.markdownImage}
        src={src}
        alt={alt ?? ""}
        width={560}
        height={280}
        sizes="(max-width: 560px) 88vw, 560px"
      />
    );
  },
  pre({ children }) {
    return <pre className={`${styles.codeBlock} swiper-no-swiping`}>{children}</pre>;
  },
};

type MarkdownContentProps = {
  markdown: string;
  className?: string;
};

export function MarkdownContent({ markdown, className }: MarkdownContentProps) {
  const classes = className ? `${styles.markdown} ${className}` : styles.markdown;

  return (
    <div className={classes}>
      <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
    </div>
  );
}

type MarkdownPageProps = {
  markdown: string;
  isActive: boolean;
};

export function MarkdownPage({ markdown, isActive }: MarkdownPageProps) {
  const isDense =
    markdown.length > 330 || markdown.includes("~~~") || markdown.includes("![");

  return (
    <section
      className={isDense ? `${styles.page} ${styles.pageDense}` : styles.page}
      aria-hidden={!isActive}
    >
      <MarkdownContent markdown={markdown} />
    </section>
  );
}
