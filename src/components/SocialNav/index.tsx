import cn from 'classnames';

import styles from './index.module.css';

export const SocialNav = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <a aria-label="Github" className={styles.github} href="https://github.com/pkolt" rel="noreferrer" target="_blank">
        <i className={cn('bi-github', styles.icon)} />
      </a>
      <a
        aria-label="LinkedIn"
        className={styles.linkedin}
        href="https://www.linkedin.com/in/pkolt"
        rel="noreferrer"
        target="_blank">
        <i className={cn('bi-linkedin', styles.icon)} />
      </a>
    </section>
  );
};
