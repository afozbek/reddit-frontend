import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "./../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, logout] = useLogoutMutation();

  let body = null;
  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>

        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Box>
        <Flex>
          <Box mr={2}>Hello {data.me.username}</Box>
          <Button variant="link" onClick={() => logout()}>
            Log Out
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Flex bg="tan" p={6}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
