import React, { createElement } from 'react';
import slugify from 'slugify';
import styles from './index.module.css';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const createHeaderBlock = (elemType: HeaderType) => {
  const HeaderBlock = ({ children }: React.PropsWithChildren): React.ReactElement => {
    const id = slugify(`${children}`, { lower: true });
    const className = styles.container;
    const props = { id, className };
    const elemChildren = (
      <>
        {children}
        <a href={`#${id}`}>#</a>
      </>
    );
    return createElement(elemType, props, elemChildren);
  };
  return HeaderBlock;
};

export const HeadersBlock = {
  H1: createHeaderBlock('h1'),
  H2: createHeaderBlock('h2'),
  H3: createHeaderBlock('h3'),
  H4: createHeaderBlock('h4'),
  H5: createHeaderBlock('h5'),
  H6: createHeaderBlock('h6'),
};
