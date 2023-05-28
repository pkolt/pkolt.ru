import { Typography } from '@/components/Typography';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Страница не найдена (404)',
};

const NotFound: React.FC = () => {
  return (
    <main>
      <Typography>
        <h2>Страница не найдена (404)</h2>
        <p>Извините, запрашиваемая страница не найдена.</p>
        <p>
          Пожалуйста, проверьте правильность введенного URL-адреса или вернитесь на{' '}
          <Link prefetch={false} href="/">
            главную страницу
          </Link>
          .
        </p>
      </Typography>
    </main>
  );
};

export default NotFound;
