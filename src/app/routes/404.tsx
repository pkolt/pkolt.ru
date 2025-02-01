import { Typography } from '@/components/Typography';
import type { JSX } from 'react';

export default function Page404(): JSX.Element {
  return (
    <Typography>
      <h1>Страница не найдена (404)</h1>
      <p>Извините, запрашиваемая страница не найдена.</p>
      <p>
        Пожалуйста, проверьте правильность введенного URL-адреса или вернитесь на <a href="/">главную страницу</a>.
      </p>
    </Typography>
  );
}
