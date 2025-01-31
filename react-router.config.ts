import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src/app',
  prerender() {
    return ['/'];
  },
} satisfies Config;
