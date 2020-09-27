import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import Layout from "./../../components/Layout";
import { Box, Heading, Spinner } from "@chakra-ui/core";

const Post: React.FC<{}> = () => {
  const router = useRouter();

  const paramPostId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching, error }] = usePostQuery({
    pause: paramPostId === -1,
    variables: {
      postId: paramPostId,
    },
  });
  let body: any = "";

  if (fetching) {
    body = <Spinner />;
  } else if (!data?.post) {
    body = <div>Could not find the post</div>;
  } else if (error) {
    body = <div>{error.message}</div>;
  } else {
    body = (
      <Box>
        <Heading mb={4}>{data.post.title}</Heading>
        <p>{data.post.text}</p>
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
