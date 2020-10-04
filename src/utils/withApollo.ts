import { InMemoryCache, ApolloClient } from '@apollo/client';
import { createWithApollo } from './createWithApollo';
import { PaginatedPosts } from '../generated/graphql';
import { NextPageContext } from 'next';
import { isServer } from './isServer';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(
            existing: PaginatedPosts | undefined,
            incoming: PaginatedPosts
          ): PaginatedPosts {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    cache,
    headers: {
      cookie: (isServer() ? ctx?.req?.headers?.cookie : undefined) || '',
    },
    credentials: 'include',
  });

export const withApollo = createWithApollo(createClient);
