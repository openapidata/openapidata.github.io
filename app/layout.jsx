import './globals.css';

export const metadata = {
  title: 'OpenAPI Data - Free Mock API',
  description: 'Free, reliable mock API for testing and prototyping. Supports JSON, XML, CSV, YAML, and GraphQL.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  );
}
