import router from './Router';

declare global {
  declare const BACKEND_URL: string;
  declare const ENV: 'local' | 'production';
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}