This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Component Documentation with Ladle

This project uses [Ladle](https://www.ladle.dev/) for documenting and exploring UI components. Ladle provides an interactive environment to view and test components in isolation.

### Running Ladle

To start the Ladle component explorer, run:

```bash
npm run ladle
# or
yarn ladle
# or
pnpm ladle
```

Open [http://localhost:61000](http://localhost:61000) in your browser to explore the components.

### Adding Stories

Stories for components are located in the `frontend/stories` directory. Each story file demonstrates the usage of a specific component. For example:
- `Button.stories.tsx` showcases the `Button` component.
- `ThemeToggle.stories.tsx` showcases the `ThemeToggle` component.

Refer to the [Ladle documentation](https://www.ladle.dev/docs/introduction/) for more details on creating and managing stories.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.