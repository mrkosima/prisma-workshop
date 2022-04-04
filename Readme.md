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
    "esModuleInterop": true,
    "noImplicitAny": false
  }
}
```

1. Init prisma project

`npx prisma init`

1. Change datasource to

```schema
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

1. Add models (e.g. Author, Post) to `schema.prisma` file

1. Run initial migration

`npx prisma migrate dev --name init`

1. Run Prisma Studio - `npx prisma studio`, http://localhost:5555

## Setup express app and PrismaClient

1. Install dependencies

```sh
npm install express --save
npm install @types/express nodemon --save-dev
```

1. Create express app and init Prisma client in `src/index.ts`:

```ts
import { PrismaClient } from '@prisma/client';
import express from 'express'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get('/authors', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json({ authors });
});

app.post('/', async (req, res) => {
    try {
      const { name, email } = req.body;
      const author = await prisma.author.create({
        data: {
          name,
          email
        }
      });
      res.json({ author });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  });

app.listen(3000)
```

1. Install `REST Client` extension for VSCode and create `test.http` with the content:

```
### 1. Get Authors
GET http://localhost:3000/author

### 2. Create author (2x time)
POST http://localhost:3000/author
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@doe.com"
}
```

## Add all necessary REST endpoints

(see source code)

## Setup prisma seed

1. Add seec script to `package.json`:

```js
"prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
```

1. Generate mocked data, e.g. with https://www.mockaroo.com/ and add to `prisma/seed.ts`:

```ts
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


const userData: Prisma.AuthorCreateInput[] = [
  // add mock data
];

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.author.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

1. Run `npx prisma db seed`

