import { PrismaClient } from '@prisma/client';
import express from 'express'
import { authorRouter, feedRouter, postRouter } from './rest';
import { graphqlMiddleware } from "./graphql";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get('/', async (_req, res) => {
  res.json({ hello: 'world ' });
})

app.use('/author', authorRouter(prisma));
app.use('/post', postRouter(prisma));
app.use('/feed', feedRouter(prisma));
app.use('/graphql', graphqlMiddleware(prisma));

app.listen(3000)