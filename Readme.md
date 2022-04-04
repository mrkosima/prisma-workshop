# Prisma: REST + GraphQL

## Init Prisma project

1. Install dependencies:

```
npm install prisma typescript ts-node @types/node --save-dev
```

2. Create tsconfig.json

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

3. Init prisma project

```
npx prisma init
```

4. Change datasource to

```schema
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

5. Add models (e.g. Author) to `schema.prisma` file:

```
model Author {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

6. Run initial migration

```
npx prisma migrate dev --name init
```

7. Run Prisma Studio

```
npx prisma studio
```

8. Open http://localhost:5555

9. Add other models (e.g. Post) to `schema.prisma` and run next migrations

```
model Author {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  viewCount Int      @default(0)
  author    Author?  @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  Int?
}
```

```
npx prisma migrate dev --name "add posts"
```

## Setup express app and PrismaClient

1. Install dependencies

```sh
npm install express --save
npm install @types/express nodemon --save-dev
```

2. Create express app and init Prisma client in `src/index.ts`:

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

`(see source code)`

## Setup prisma seed

3. Add seec script to `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

4. Generate mocked data, e.g. with https://www.mockaroo.com/ and add to `prisma/seed.ts`:

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

5. Run `npx prisma db seed`

## Setup GraphQL endpoint

1. Install dependencies:

```
npm install @graphql-tools/schema express-graphql graphql-scalars --save
```

2. Crate GraphQL middleware with all necessary resolves

`(see source code)`

3. Add graphql middleware in `src/index.ts`:

```ts
import { graphqlMiddleware } from "./graphql";

app.use('/graphql', graphqlMiddleware(prisma));
```

4. Open http://localhost:3000/graphql, test queries and mutations

## Setup ERD generator

1. Install dependencies:

```
npm install prisma-erd-generator @mermaid-js/mermaid-cli --save-dev
```

2. Add `erd` generator to `schema.prisma`:

```schema
generator erd {
  provider = "prisma-erd-generator"
  output   = "../erd.png"
}
```

3. Run `npx prisma generate` and open `erd.png`