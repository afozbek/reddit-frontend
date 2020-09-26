import { Box, Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { useVoteMutation } from "./../generated/graphql";

interface PostProps {
  post: PostSnippetFragment;
}

const Post: React.FC<PostProps> = ({ post, ...rest }) => {
  const [votingLoading, setVotingLoading] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  const handleVoting = async (voteType: "upvote" | "downvote") => {
    let value = 1;
    let loadingType: "upvote-loading" | "downvote-loading" | "not-loading" =
      "not-loading";
    switch (voteType) {
      case "upvote":
        if (post.voteStatus === 1) {
          return;
        }

        value = 1;
        loadingType = "upvote-loading";

        break;
      case "downvote":
        if (post.voteStatus === -1) {
          return;
        }

        value = -1;
        loadingType = "downvote-loading";
        break;
      default:
        value = 1;
        loadingType = "not-loading";
        break;
    }

    setVotingLoading(loadingType);

    await vote({
      postId: post.id,
      value,
    });

    setVotingLoading("not-loading");
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Flex>
        <Box mr={4}>
          <Flex flexDirection="column" alignItems="center">
            <IconButton
              data-vote-type="upvote"
              onClick={() => handleVoting("upvote")}
              icon="chevron-up"
              size="lg"
              variantColor={post.voteStatus === 1 ? "teal" : undefined}
              aria-label="Vote Up"
              isLoading={votingLoading === "upvote-loading"}
            />
            <Text padding="5px 0">
              <strong>{post.points}</strong>
            </Text>
            <IconButton
              data-vote-type="downvote"
              onClick={() => handleVoting("downvote")}
              icon="chevron-down"
              size="lg"
              variantColor={post.voteStatus === -1 ? "red" : undefined}
              aria-label="Vote Down"
              isLoading={votingLoading === "downvote-loading"}
            />
          </Flex>
        </Box>
        <Box width="100%">
          <Flex alignItems="center">
            <Heading fontSize="xl">{post.title}</Heading>
            <Box marginLeft="auto">
              Posted By: <strong>{post.creator.username}</strong>
            </Box>
          </Flex>
          <Text mt={4}>{post.textSnippet}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
