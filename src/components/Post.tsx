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

  const handleVoting = async (e: any) => {
    let value = 1;
    let loadingType: "upvote-loading" | "downvote-loading" | "not-loading" =
      "not-loading";

    switch (e.target.dataset.voteType) {
      case "upvote":
        value = 1;
        loadingType = "upvote-loading";
        break;
      case "downvote":
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
              onClick={handleVoting}
              icon="chevron-up"
              size="lg"
              aria-label="Vote Up"
              isLoading={votingLoading === "upvote-loading"}
            />
            <Text padding="5px 0">
              <strong>{post.points}</strong>
            </Text>
            <IconButton
              data-vote-type="downvote"
              onClick={handleVoting}
              icon="chevron-down"
              size="lg"
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
