import cn from 'classnames';
// import hljs from 'highlight.js';
import { useMemo } from 'react';
// import 'highlight.js/styles/github.css';
import styles from './index.module.css';
//! import { fontJetBrainsMono } from '@/fonts';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  children: string;
  className: string;
}

export const CodeBlock = ({ children, className }: CodeBlockProps): JSX.Element => {
  const language = useMemo(() => className?.match(/^language-(?<name>\w+)/)?.groups?.name, [className]);
  const content = useMemo(() => String(children), [children]);
  const html = useMemo(() => {
    if (language) {
      // return hljs.highlight(content, { language }).value;
    }
    return children;
  }, [children, language]);

  if (!language) {
    // return <code className={cn(className, styles.codeInline, fontJetBrainsMono.className)}>{children}</code>;
    return <code className={cn(className, styles.codeInline)}>{children}</code>;
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.lang}>{language}</div>
      <CopyButton className={styles.copy} content={content} />
      {/* <code className={cn(className, fontJetBrainsMono.className)} dangerouslySetInnerHTML={{ __html: html }}></code> */}
      <code className={cn(className)} dangerouslySetInnerHTML={{ __html: html }}></code>
    </div>
  );
};
