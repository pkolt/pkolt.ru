import cn from 'classnames';
import styles from './index.module.css';

export const SocialNav = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <a href="https://github.com/pkolt" target="_blank" rel="noreferrer" className={styles.github}>
        <i className={cn('bi-github', styles.icon)} />
      </a>
      <a href="https://twitter.com/pkolt" target="_blank" rel="noreferrer" className={styles.twitter}>
        <i className={cn('bi-twitter', styles.icon)} />
      </a>
      <a href="https://www.linkedin.com/in/pkolt" target="_blank" rel="noreferrer" className={styles.linkedin}>
        <i className={cn('bi-linkedin', styles.icon)} />
      </a>
    </section>
  );
};
