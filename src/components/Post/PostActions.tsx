import { Box, IconButton } from "@chakra-ui/core";
import React from "react";
import { useMeQuery, useDeletePostMutation } from "../../generated/graphql";
import NextLink from "next/link";

interface PostActionsProps {
  creatorId: number;
  postId: number;
}

export const PostActions: React.FC<PostActionsProps> = ({
  creatorId,
  postId,
}) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  return creatorId === data?.me?.id ? (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${postId}`}>
        <IconButton
          icon="edit"
          mr={4}
          size="sm"
          variantColor="teal"
          aria-label="Delete Post"
        ></IconButton>
      </NextLink>

      <IconButton
        icon="delete"
        onClick={() => deletePost({ postId })}
        size="sm"
        variantColor="red"
        aria-label="Delete Post"
      ></IconButton>
    </Box>
  ) : null;
};
