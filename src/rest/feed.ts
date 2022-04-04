import { PrismaClient } from "@prisma/client";
var express = require('express');


export const feedRouter = (prisma: PrismaClient) => {
  var router = express.Router();

  router.get('/', async (req, res) => {
    const { searchString, skip, take } = req.query;
    const result = await prisma.post.findMany({
      skip: Number(skip) || undefined,
      take: Number(take) || undefined,
      where: {
        ...(searchString && {
          OR: [
            { title: { contains: searchString as string } },
            { content: { contains: searchString as string } },
          ]
        }),
      },
    });
    res.json(result);
  });

  return router;
}
