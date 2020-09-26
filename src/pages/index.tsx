import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "./../components/Layout";
import React, { useState } from "react";
import { Box, Button, Flex, Select, Spinner, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Feature } from "../components/Feature";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 5,
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
        <Flex margin="auto" alignItems="center" a>
          <Button
            variantColor="teal"
            width="60%"
            onClick={() => router.push("/create-post")}
            cursor="pointer"
          >
            Create Post
          </Button>

          <Select
            variant="outline"
            placeholder="Filter: "
            cursor="pointer"
            width="30%"
            marginLeft="auto"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Flex>

        <br />
        {!data && fetching ? (
          <Spinner size="xl" />
        ) : (
          <Stack spacing={8}>
            {data?.posts.posts?.map((p) => (
              <Feature post={p} key={p.id} />
            ))}
          </Stack>
        )}

        {data && data.posts.hasMore && (
          <Button
            mt={8}
            width="100%"
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data?.posts.posts[data.posts.posts.length - 1].createdAt,
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
