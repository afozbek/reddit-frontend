import { Box, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import { Voting } from "./Voting";
import { PostActions } from "./PostActions";
import { PostBody } from "./PostBody";

interface PostProps {
  post: PostSnippetFragment;
}

const Post: React.FC<PostProps> = ({ post, ...rest }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Flex>
        <Voting
          postId={post.id}
          voteStatus={post.voteStatus}
          points={post.points}
        />

        <Box width="100%">
          <PostBody
            title={post.title}
            postId={post.id}
            creator={post.creator}
          />

          <Flex alignItems="center">
            <Text mt={4} width="75%">
              {post.textSnippet}
            </Text>

            <PostActions creatorId={post.creatorId} postId={post.id} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
