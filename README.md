# PermaDoor

Hello! This is only a testing repo for my learning of NextJS, NextAuth and NextUI v2.

I used Postgres as my database and Vercel as my deploy site.

## First start
Edit your .env file.

You need to open a command line and get yourself to the directory you cloned the repo into, then:
```bash
npm i

npx prisma migrate dev --name init

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

NextUI V2

NextJS version: Latest

NextAuth v4
