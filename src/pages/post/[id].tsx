import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import Layout from "./../../components/Layout";
import { Spinner } from "@chakra-ui/core";

interface PostProps {}

export const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();

  const paramPostId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = usePostQuery({
    pause: paramPostId === -1,
    variables: {
      postId: paramPostId,
    },
  });

  if (fetching) {
    return <Spinner />;
  }

  return <Layout>{data?.post?.text}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
