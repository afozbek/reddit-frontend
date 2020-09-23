import { Box, Heading, Text } from "@chakra-ui/core";
import React from "react";

interface FeatureProps {
  title: string;
  desc: string;
}

export const Feature: React.FC<FeatureProps> = ({ title, desc, ...rest }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};
