import './globals.css';

export const metadata = {
  title: 'OpenAPI Data - Free Mock API for Developers',
  description: 'The best free open-source mock data API. Supports JSON, XML, CSV, YAML, NDJSON, and GraphQL. Perfect for prototyping, testing, and development.',
  keywords: ['mock api', 'json api', 'fake data', 'rest api', 'graphql', 'xml api', 'csv api', 'prototype data', 'developer tools', 'free api'],
  authors: [{ name: 'OpenAPI Data Team' }],
  openGraph: {
    title: 'OpenAPI Data - Free Mock API for Developers',
    description: 'Get massive datasets in JSON, XML, CSV, and more. No auth required.',
    url: 'https://openapidata.github.io',
    siteName: 'OpenAPI Data',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenAPI Data - Free Mock API',
    description: 'Test your apps with realistic user, product, and order data in any format.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased bg-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  );
}