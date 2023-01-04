import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="bg-slate-100" {...pageProps} />
}

export default MyApp
