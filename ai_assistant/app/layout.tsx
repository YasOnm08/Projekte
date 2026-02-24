import { ReactNode } from 'react';

// Metadata for the application, used for SEO and page information
export const metadata = {
  title: 'AI Assistant | Interstellar Development', // Title of the page
  description: 'A little AI chat that is able to assist you in little tasks', // Description of the page
};

// RootLayout component definition
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
