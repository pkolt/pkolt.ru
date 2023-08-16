import styles from './index.module.css';
import { Icon } from '@/components/Icon';

export const SocialNav = (): JSX.Element => {
  return (
    <section className={styles.container}>
      <a href="https://github.com/pkolt" target="_blank" rel="noreferrer" className={styles.github}>
        <Icon name="github" />
      </a>
      <a href="https://twitter.com/pkolt" target="_blank" rel="noreferrer" className={styles.twitter}>
        <Icon name="twitter" />
      </a>
      <a href="https://www.linkedin.com/in/pkolt" target="_blank" rel="noreferrer" className={styles.linkedin}>
        <Icon name="linkedin" />
      </a>
    </section>
  );
};
