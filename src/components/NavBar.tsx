import React from "react";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "./../utils/isServer";
import { FiLogOut } from "react-icons/fi";

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
        <Flex alignItems="center">
          <Box mr={3} color="#11563f">
            Hello<strong> {data.me.username}</strong>
          </Box>
          <Button
            leftIcon={FiLogOut}
            onClick={() => logout()}
            variantColor="teal"
            variant="solid"
          >
            Log Out
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <nav>
      <Flex bg="#d4f5f3" p={5} boxShadow="0 4px 6px -1px rgba(0,0,0,0.1)">
        <Box>
          <NextLink href="/">
            <Heading color="#087775" cursor="pointer">
              Reddit
            </Heading>
          </NextLink>
        </Box>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </nav>
  );
};
