import Image, { ImageProps } from 'next/image';
import cn from 'classnames';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkYoutube from 'remark-youtube';
import styles from './index.module.css';
import { CodeBlock } from '@/components/CodeBlock';
import { HeadersBlock } from '@/components/HeadersBlock';

const ResponsiveImage: React.FC<ImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} width={650} height={350} />;
};

const components: Components = {
  img: ResponsiveImage as any,
  code: CodeBlock as any,
  h1: HeadersBlock.H1 as any,
  h2: HeadersBlock.H2 as any,
  h3: HeadersBlock.H3 as any,
  h4: HeadersBlock.H4 as any,
  h5: HeadersBlock.H5 as any,
  h6: HeadersBlock.H6 as any,
};

interface MarkdownProps {
  children?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      className={cn(styles.container, 'markdown-body')}
      remarkPlugins={[remarkGfm, remarkYoutube]}
      components={components}>
      {children ?? ''}
    </ReactMarkdown>
  );
};
