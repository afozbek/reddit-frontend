import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "./../../generated/graphql";

import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "./../../utils/createUrqlClient";

import NextLink from "next/link";

const ChangePassword: NextPage<{ passwordToken: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  const passwordToken =
    typeof router.query.passwordToken === "string"
      ? router.query.passwordToken
      : "";
  const handleSubmit = async (values: any, { setErrors }: any) => {
    const response = await changePassword({
      newPassword: values.newPassword,
      passwordToken,
    });

    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors);
      if (errorMap["token"]) {
        // handle 'token' field error
        setTokenError(errorMap["token"]);
      }

      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      // worked
      console.log(response.data?.changePassword.user);
      router.push("/");
    }
  };

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ newPassword: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder="Please enter your new password"
              name="newPassword"
              label="New Password"
              type="password"
            />

            {tokenError && (
              <Flex>
                <Box color="#f00" mr={2}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link color="#000">Generate New One</Link>
                </NextLink>
              </Flex>
            )}

            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
              cursor="pointer"
              width="100%"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
