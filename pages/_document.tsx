import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-slate-100 dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
