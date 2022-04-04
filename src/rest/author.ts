import { PrismaClient } from "@prisma/client";
var express = require('express');


export const authorRouter = (prisma: PrismaClient) => {
  var router = express.Router();

  // Get authors
  router.get('/', async (req, res) => {
    const authors = await prisma.author.findMany({
      include: {
        posts: true
      }
    });
    res.json({ authors });
  });

  // Create author
  router.post('/', async (req, res) => {
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

  // Delete Author
  // https://www.prisma.io/docs/guides/database/advanced-database-tasks/cascading-deletes/sqlite#7-introspect-your-database-with-prisma
  // Deletion behaviors for relations are not yet supported in the Prisma schema so you don't see them anywhere.
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const author = await prisma.author.delete({
        where: {
          id: Number(id)
        }
      })
      res.json({ author });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  });

  return router;
}
