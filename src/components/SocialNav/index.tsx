import cn from 'classnames';

import styles from './index.module.css';

export const SocialNav = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <a aria-label="Github" className={styles.github} href="https://github.com/pkolt" rel="noreferrer" target="_blank">
        <i className={cn('bi-github', styles.icon)} />
      </a>
    </section>
  );
};
