import { Metadata } from 'next';
import Link from 'next/link';
import { Typography } from '@/components/Typography';
import MainLayout from './[slug]/layout';

export const metadata: Metadata = {
  title: 'Страница не найдена (404)',
};

const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <Typography>
        <h1>Страница не найдена (404)</h1>
        <p>Извините, запрашиваемая страница не найдена.</p>
        <p>
          Пожалуйста, проверьте правильность введенного URL-адреса или вернитесь на{' '}
          <Link prefetch={false} href="/">
            главную страницу
          </Link>
          .
        </p>
      </Typography>
    </MainLayout>
  );
};

export default NotFound;
