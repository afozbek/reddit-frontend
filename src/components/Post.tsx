import { Box, Flex, Heading, IconButton, Text, Link } from "@chakra-ui/core";
import React from "react";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import NextLink from "next/link";
import { Voting } from "./Voting";

interface PostProps {
  post: PostSnippetFragment;
}

const Post: React.FC<PostProps> = ({ post, ...rest }) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Flex>
        <Voting
          postId={post.id}
          voteStatus={post.voteStatus}
          points={post.points}
        />

        <Box width="100%">
          <Flex alignItems="center" mb={2}>
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <Link width="75%">
                <Heading fontSize="xl" width="">
                  {post.title}
                </Heading>
              </Link>
            </NextLink>
            <Box marginLeft="auto">
              Posted By: <strong>{post.creator.username}</strong>
            </Box>
          </Flex>

          <Flex alignItems="center">
            <Text mt={4} width="75%">
              {post.textSnippet}
            </Text>
            {post.creatorId === data?.me?.id ? (
              <Box ml="auto">
                <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
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
                  onClick={() => deletePost({ postId: post.id })}
                  size="sm"
                  variantColor="red"
                  aria-label="Delete Post"
                ></IconButton>
              </Box>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
