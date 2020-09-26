import { Box, Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/core";
import React from "react";
import { Post, User } from "../generated/graphql";

interface FeatureProps {
  post: Pick<
    Post,
    | "id"
    | "title"
    | "textSnippet"
    | "creatorId"
    | "createdAt"
    | "updatedAt"
    | "points"
  > & {
    creator: Pick<User, "id" | "username" | "email">;
  };
}

export const Feature: React.FC<FeatureProps> = ({ post, ...rest }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Flex>
        <Box mr={4}>
          <Flex flexDirection="column" alignItems="center">
            <IconButton icon="chevron-up" size="lg" aria-label="Vote Up" />
            <Text padding="5px 0">
              <strong>{post.points}</strong>
            </Text>
            <IconButton icon="chevron-down" size="lg" aria-label="Vote Down" />
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
