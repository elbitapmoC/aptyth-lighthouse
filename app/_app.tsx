import { AppProps } from 'next/app';
import { TanStackQueryProvider } from '@/lib/tanstack-query';
import withTranslation from '@/i18n';
import '@/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TanStackQueryProvider>
      <Component {...pageProps} />
    </TanStackQueryProvider>
  );
}

export default withTranslation(MyApp);
