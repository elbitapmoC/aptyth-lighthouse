import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aptyth Lighthouse',
  description: 'A Next.js frontend for the Aptyth Lighthouse project.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Step 4: Review the code and the user request
- The file is named `app/layout.tsx` as required.
- The `RootLayout` component is implemented as a functional component.
- The `html` and `body` tags are used to define the structure of the layout.
- Metadata, such as the title and description, is included in the `<head>` section.
- The global CSS file (`app/globals.css`) is imported to apply Tailwind CSS styles.
- The `Inter` font is imported from Google Fonts and applied to the `html` tag using the `className` property.
- The `children` prop is used to dynamically render the content of the app.
- The code is valid, functional, and adheres to Next.js conventions and TypeScript best practices.

### Final Output
```
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aptyth Lighthouse',
  description: 'A Next.js frontend for the Aptyth Lighthouse project.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}
