---
title: How to add a YouTube player to your website using Markdown?
created: 2023-05-29
modified: 2023-05-29
tags:
  - Open Source
---

Markdown is an excellent markup language for creating blogs and writing articles. However, sometimes it is necessary to embed videos on a website. There is a great npm package that will help you embed a YouTube player on your site.

![youtube](/posts/remark-youtube/image.jpg)

This npm package is called [remark-youtube](https://www.npmjs.com/package/remark-youtube). If you are using React or Next.js, an example of adding YouTube player support would look something like this:

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkYoutube from 'remark-youtube';

interface PageProps {
    markdownContent?: string
}

export const Page: React.FC<PageProps> = ({ markdownContent = '' }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkYoutube]}>
        {markdownContent}
    </ReactMarkdown>
  );
};
```

In the markdown text, simply provide a link to the desired YouTube page:

```markdown
## My new video

https://youtu.be/enTFE2c68FQ

or

https://www.youtube.com/watch?v=enTFE2c68FQ
```

You can also customize the size of the displayed YouTube player:

```tsx
export const Page: React.FC<PageProps> = ({ markdownContent = '' }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, [remarkYoutube, { width: 760, height: 515 }]]}>
        {markdownContent}
    </ReactMarkdown>
  );
};
```