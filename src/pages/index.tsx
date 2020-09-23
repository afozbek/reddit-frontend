import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "./../components/Layout";
import React, { useState } from "react";
import { Box, Button, Spinner, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Feature } from "../components/Feature";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({ variables });
  const router = useRouter();

  if (!fetching && !data) {
    return <div>Haven't got any data yet 🤨</div>;
  }

  return (
    <Layout>
      <Box paddingBottom="100px">
        <Box margin="auto" width="50%">
          <Button
            mt={4}
            width="100%"
            variantColor="teal"
            onClick={() => router.push("/create-post")}
            cursor="pointer"
          >
            Create Post
          </Button>
        </Box>

        <br />
        {!data && fetching ? (
          <Spinner size="xl" />
        ) : (
          <Stack spacing={8}>
            {data?.posts.map((p) => (
              <Feature key={p.id} title={p.title} desc={p.textSnippet} />
            ))}
          </Stack>
        )}

        {data && (
          <Button
            mt={8}
            width="100%"
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
              });
            }}
          >
            Load More
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
