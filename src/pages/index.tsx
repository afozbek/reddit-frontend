import { usePostsQuery } from '../generated/graphql';
import Layout from './../components/Layout';
import React from 'react';
import { Box, Button, Spinner, Stack } from '@chakra-ui/core';
import Post from '../components/Post/Post';
import { GeneralPostActions } from '../components/GeneralPostActions';
import { withApollo } from './../utils/withApollo';

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadMoreBtnHandler = async () => {
    await fetchMore({
      variables: {
        limit: variables?.limit,
        cursor: data?.posts.posts[data.posts.posts.length - 1].createdAt,
      },
      // updateQuery: (prevValues, { fetchMoreResult }): PostsQuery => {
      //   if (!fetchMoreResult) {
      //     return prevValues as PostsQuery;
      //   }

      //   return {
      //     __typename: 'Query',
      //     posts: {
      //       __typename: 'PaginatedPosts',
      //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
      //       posts: [
      //         ...(prevValues as PostsQuery).posts.posts,
      //         ...(fetchMoreResult as PostsQuery).posts.posts,
      //       ],
      //     },
      //   };
      // },
    });
  };

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
      onClick={loadMoreBtnHandler}
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

export default withApollo({ ssr: true })(Index);
