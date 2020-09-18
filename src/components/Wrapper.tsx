import { Box } from "@chakra-ui/core";
import React from "react";

interface Props {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<Props> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
