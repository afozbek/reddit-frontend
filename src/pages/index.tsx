import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "./../components/Layout";
import React from "react";
import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

const Index = () => {
  const [{ data }] = usePostsQuery();
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
        <ul>
          {data?.posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
