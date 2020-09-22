import { Box } from "@chakra-ui/core";
import React from "react";

export type WrapperVariant = "small" | "regular";
interface Props {
  variant?: WrapperVariant;
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
