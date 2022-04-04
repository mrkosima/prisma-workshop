import { PrismaClient } from "@prisma/client";
var express = require('express');


export const postRouter = (prisma: PrismaClient) => {
  var router = express.Router();
  // Create post
  router.post('/', async (req, res) => {
    try {
      const { title, content, authorEmail } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: {
              email: authorEmail,
            }
          }
        }
      });
      res.json({ post });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  })

  // Get all posts
  router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
  });

  // Get post by id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id),
        }
      })
      res.json({ post });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  })

  // Update post views vount
  router.put('/:id/views', async (req, res) => {
    const { id } = req.params;

    try {
      const post = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          viewCount: {
            increment: 1,
          }
        }
      })
      res.json({ post });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  })

  // Delete post
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await prisma.post.delete({
        where: {
          id: Number(id),
        }
      })

      res.json({ result });
    } catch (e) {
      res.status(400).send(`Bad request, ${e}`);
    }
  })

  return router;
}
