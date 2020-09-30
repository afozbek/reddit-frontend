import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "./../components/Layout";
import React, { useState } from "react";
import { Box, Button, Spinner, Stack } from "@chakra-ui/core";
import Post from "../components/Post";
import { PostActions } from "../components/PostActions";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({ variables });

  if (!fetching && !data) {
    return <div>Haven't got any data yet 🤨</div>;
  }

  const body =
    !data && fetching ? (
      <Spinner size="xl" />
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
      width="100%"
      isLoading={fetching}
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
      <Box paddingBottom="100px">
        <PostActions />

        {body}

        {loadMore}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
