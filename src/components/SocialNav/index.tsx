import GithubIcon from '../../../public/images/github.svg';
import TwitterIcon from '../../../public/images/twitter.svg';
import LinkedinIcon from '../../../public/images/linkedin.svg';
import styles from './index.module.css';

export const SocialNav: React.FC = () => {
  return (
    <section className={styles.container}>
      <a href="https://github.com/pkolt" target="_blank" rel="noreferrer" className={styles.github}>
        <GithubIcon alt="GitHub" />
      </a>
      <a href="https://twitter.com/pkolt" target="_blank" rel="noreferrer" className={styles.twitter}>
        <TwitterIcon alt="Twitter" />
      </a>
      <a href="https://www.linkedin.com/in/pkolt" target="_blank" rel="noreferrer" className={styles.linkedin}>
        <LinkedinIcon alt="LinkedIn" />
      </a>
    </section>
  );
};
