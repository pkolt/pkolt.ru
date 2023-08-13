import { useCallback, useState } from 'react';
import { copyTextToClipboard } from '@/utils/copy-text-to-clipboard';

interface CopyButtonProps {
  content: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ className, content }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    const result = await copyTextToClipboard(content);
    if (result) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);
  return (
    <button className={className} onClick={onCopy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};
