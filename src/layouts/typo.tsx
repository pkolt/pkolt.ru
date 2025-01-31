import { Typography } from '@/components/Typography';
import type { JSX } from 'react';
import { Outlet } from 'react-router';

export default function TypographyLayout(): JSX.Element {
  return (
    <Typography>
      <Outlet />
    </Typography>
  );
}
