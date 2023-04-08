'use client';
import cn from 'classnames';
import hljs from 'highlight.js';
import { useCallback, useMemo, useState } from 'react';
import 'highlight.js/styles/github.css';
import styles from './index.module.css';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import { fontJetBrainsMono } from '../../fonts';

interface CodeBlockProps {
  children: string;
  className: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language = useMemo(() => className?.match(/^language-(?<name>\w+)/)?.groups?.name, [className]);
  const textCode = useMemo(() => String(children), [children]);
  const html = useMemo(() => {
    if (language) {
      return hljs.highlight(textCode, { language }).value;
    }
    return children;
  }, [children, language, textCode]);

  const onCopy = useCallback(async () => {
    const result = await copyTextToClipboard(textCode);
    if (result) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [textCode]);

  if (!language) {
    return <code className={cn(className, styles.codeInline, fontJetBrainsMono.className)}>{children}</code>;
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.lang}>{language}</div>
      <button className={styles.copy} onClick={onCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <code className={cn(className, fontJetBrainsMono.className)} dangerouslySetInnerHTML={{ __html: html }}></code>
    </div>
  );
};
