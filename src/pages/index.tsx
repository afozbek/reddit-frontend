import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "./../components/Layout";
import React from "react";
import { Box, Button, Stack } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Feature } from "../components/Feature";

const Index = () => {
  const [{ data }] = usePostsQuery({ variables: { limit: 10 } });
  const router = useRouter();
  return (
    <Layout>
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
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8} paddingBottom="100px">
          {data?.posts.map((p) => (
            <Feature key={p.id} title={p.title} desc={p.text} />
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
