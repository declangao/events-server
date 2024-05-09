import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { ResolverContext, resolvers } from './resolvers/index.js';
import { typeDefs } from './typeDefs/index.js';

declare global {
  namespace PrismaJson {
    type Image = {
      url: string;
      publicId: string;
    };
  }
}

dotenv.config();

const port = process.env.PORT || 8080;

const app: Express = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

const apolloServer = new ApolloServer<ResolverContext>({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use(
  '/graphql',
  apolloMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`[server]: REST API is running at http://localhost:${port}`);
  console.log(
    `[server]: GraphQL is running at http://localhost:${port}/graphql`
  );
});
