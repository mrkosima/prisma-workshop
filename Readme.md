# Prisma - REST + GraphQL

## Init Prisma project

1. Install dependencies:

`npm install prisma typescript ts-node @types/node --save-dev`

1. Create tsconfig.json

```ts
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

1. Init prisma project

`npx prisma init`

1. Change datasource to

```ts
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

1. Add models (e.g. Author, Post) to `schema.prisma` file

1. Run initial migration

`npx prisma migrate dev --name init`

1. Run Prisma Studio - `npx prisma studio`, http://localhost:5555