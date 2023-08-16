import React, { createElement } from 'react';
import slugify from 'slugify';
import styles from './index.module.css';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const createHeader = (elemType: HeaderType) => {
  const HeaderBlock = ({ children }: React.PropsWithChildren): React.ReactElement => {
    const id = slugify(`${children}`, { lower: true });
    const className = styles.container;
    const props = { id, className };
    const elemChildren = (
      <>
        {children}
        <a href={`#${id}`} className={styles.link}>
          #
        </a>
      </>
    );
    return createElement(elemType, props, elemChildren);
  };
  return HeaderBlock;
};
export const H1 = createHeader('h1');
export const H2 = createHeader('h2');
export const H3 = createHeader('h3');
export const H4 = createHeader('h4');
export const H5 = createHeader('h5');
export const H6 = createHeader('h6');
