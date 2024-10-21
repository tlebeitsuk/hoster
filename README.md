# hoster
Platform var man kan skapa och använda resurser för sina appar. Ledorden är användarvändligt och anpassningsbart.

## Teknik
- Next.js
- PostgreSQL
- Tailwind
- shadcn/ui
- Incus (system container and virtual machine manager)

## Förkunskaper
- [Essential JavaScript for React](https://nextjs.org/learn/react-foundations/getting-started-with-react#essential-javascript-for-react)
- [React Foundations](https://nextjs.org/learn/react-foundations)
- [Learn Next.js](https://nextjs.org/learn/dashboard-app)

## Getting Started

### Setup local postgresql database

Install Docker Desktop and run the following command:

```bash
docker-compose up -d
```

Update the `.env` file with the following:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

Then, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
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
