import { Flex, Link, Heading, Box } from "@chakra-ui/core";
import React from "react";

import NextLink from "next/link";
import { User } from "./../../../../reddit-server/src/entities/User";
import { DefaultUserFragmentFragment } from "../../generated/graphql";

interface PostBodyProps {
  title: string;
  postId: number;
  creator: DefaultUserFragmentFragment;
}

export const PostBody: React.FC<PostBodyProps> = ({
  title,
  postId,
  creator,
}) => {
  return (
    <Flex alignItems="center" mb={2}>
      <NextLink href="/post/[id]" as={`/post/${postId}`}>
        <Link width="75%">
          <Heading fontSize="xl" width="">
            {title}
          </Heading>
        </Link>
      </NextLink>
      <Box marginLeft="auto">
        Posted By: <strong>{creator.username}</strong>
      </Box>
    </Flex>
  );
};
