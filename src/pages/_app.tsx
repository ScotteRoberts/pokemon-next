import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="bg-slate-100" {...pageProps} />
}

export default MyApp
