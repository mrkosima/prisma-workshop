import { PrismaClient } from '@prisma/client';
import express from 'express'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());


app.get('/author', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json({ authors });
});

app.post('/author', async (req, res) => {
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