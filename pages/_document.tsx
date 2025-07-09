import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'
          integrity='sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
          
        <link rel='manifest' href='/manifest.json' />
        <link href='/favicon.ico' rel='icon' type='public/ico' sizes='16x16' />
        <link rel='apple-touch-icon' href='/path/to/apple-touch-icon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
