# PermaDoor

Hello! If you're reading this then you must be special because this is only a testing repo for my learning of NextJS, NextAuth and NextUI v2.

Currently (July 2023) the NextUI is in development so occasional ui bugs might happen!

I used Postgres as my database and Vercel as my deploy site.

## First start
Edit your .env file.

You need to open a command line and get yourself to the directory you cloned the repo into, then:
```bash
npm i

npm prisma migrate dev --name init

npm run dev
```

## Normal run
If you've already installed everything before and you're returning, then the only command you need to do is:
```bash
npm run dev
```

## Database
If you edit schema.prisma then you need to update the PrismaClient like this:
```bash
npm prisma migrate dev --name *NAME*
```

## Information and sources i used
Prisma init: https://codevoweb.com/how-to-setup-prisma-orm-in-nextjs-13-app-directory/

NextUI V2 documentation (As of July 2023): https://nextui-docs-v2.vercel.app

NextJS version: 13.4.8 (App Router)

NextAuth v4
