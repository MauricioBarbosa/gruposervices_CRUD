import '../styles/global.scss';
import type { AppProps } from 'next/app'
import { PersonContextProvider } from '../context/PersonContext';
import { PictureContextProvider } from '../context/PictureContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PictureContextProvider>
      <PersonContextProvider>
        <Component {...pageProps} />
      </PersonContextProvider>
    </PictureContextProvider>
  );
}

export default MyApp
