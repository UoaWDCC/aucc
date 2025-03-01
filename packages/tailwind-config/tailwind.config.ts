import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        primary: '#1B416F',
      },
    },
  },
};
export default config;
