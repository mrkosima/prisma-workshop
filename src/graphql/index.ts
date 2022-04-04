import { PrismaClient } from '@prisma/client'
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DateTimeResolver } from "graphql-scalars";

export interface Context {
  prisma: PrismaClient
}

// You can pass prisma schema to graphql, but that's not secure
const typeDefs = `
  type Query {
    allAuthors: [Author!]!
    postById(id: Int!): Post
    feed(searchString: String, skip: Int, take: Int): [Post!]!
    postsByAuthor(id: Int!): [Post]
    viewedPosts: [Post]
  }

  type Mutation {
    registerAuthor(name: String, email: String!): Author!
    createPost(title: String!, content: String, authorEmail: String): Post
    deletePost(id: Int!): Post
  }

  type Author {
    id: Int!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Post {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    content: String
    viewCount: Int!
    author: Author
  }

  scalar DateTime
`;


const resolvers = {
  Query: {
    allAuthors: (_parent, _args, context: Context) => {
      return context.prisma.author.findMany();
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id }
      })
    },
    postsByAuthor: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.author.findUnique({
        where: { id: args.id }
      }).posts();
    },
    viewedPosts: (_parent, _args, context: Context) => {
      return context.prisma.post.findMany({
        where: {
          viewCount: {
            gt: 0
          }
        }
      });
    },
    feed: (
      _parent,
      args: {
        searchString: string | undefined;
        skip: number | undefined;
        take: number | undefined;
      },
      context: Context
    ) => {
      return context.prisma.post.findMany({
        where: {
          ...(args.searchString && {
            OR: [
              { title: { contains: args.searchString as string, } },
              { content: { contains: args.searchString as string } },
            ]
          }),
        },
        skip: Number(args.skip) || undefined,
        take: Number(args.take) || undefined,
      });
    },
  },
  Mutation: {
    registerAuthor: (
      _parent,
      args: { name: string | undefined; email: string },
      context: Context
    ) => {
      return context.prisma.author.create({
        data: {
          name: args.name,
          email: args.email
        }
      })
    },
    createPost: (
      _parent,
      args: { title: string; content: string | undefined; authorEmail: string },
      context: Context
    ) => {
      return context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          author: {
            connect: {
              email: args.authorEmail
            }
          }
        }
      })
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { id: args.id }
      })
    },
  },
  Post: {
    author: (parent, _args, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: parent.id }
      }).author()
    },
  },
  Author: {
    posts: (parent, _args, context: Context) => {
      return context.prisma.author.findUnique({
        where: { id: parent.id }
      }).posts() // Join tables
    },
  },
  DateTime: DateTimeResolver,
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export const graphqlMiddleware = (prisma: PrismaClient) =>
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { prisma },
  })