import { usePostsQuery } from '../generated/graphql';
import Layout from './../components/Layout';
import React, { useState } from 'react';
import { Box, Button, Spinner, Stack } from '@chakra-ui/core';
import Post from '../components/Post/Post';
import { GeneralPostActions } from '../components/GeneralPostActions';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });

  const { data, error, loading } = usePostsQuery({ variables });

  if (!loading && !data) {
    return (
      <Box>
        Haven't got any data yet 🤨
        <Box>{error?.message}</Box>
      </Box>
    );
  }

  const body =
    !data && loading ? (
      <Spinner size='xl' />
    ) : (
      <Stack spacing={8}>
        {data?.posts.posts?.map((p) =>
          !p ? null : <Post post={p} key={p.id} />
        )}
      </Stack>
    );

  const loadMore = data && data.posts.hasMore && (
    <Button
      mt={8}
      width='100%'
      isLoading={loading}
      onClick={() => {
        setVariables({
          limit: variables.limit,
          cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt,
        });
      }}
    >
      Load More
    </Button>
  );

  return (
    <Layout>
      <Box paddingBottom='100px'>
        <GeneralPostActions />

        {body}

        {loadMore}
      </Box>
    </Layout>
  );
};

export default Index;
