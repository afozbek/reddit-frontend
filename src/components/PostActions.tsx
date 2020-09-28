import { Button, Flex, Select } from "@chakra-ui/core";
import React from "react";
import { useRouter } from "next/router";

interface PostActionsProps {}

export const PostActions: React.FC<PostActionsProps> = ({}) => {
  const router = useRouter();

  return (
    <Flex margin="auto" alignItems="center" mb={8}>
      <Button
        variantColor="teal"
        width="60%"
        onClick={() => router.push("/create-post")}
        cursor="pointer"
      >
        Create Post
      </Button>

      <Select
        variant="outline"
        placeholder="Filter: "
        cursor="pointer"
        width="30%"
        marginLeft="auto"
        focusBorderColor="#319795"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </Flex>
  );
};
