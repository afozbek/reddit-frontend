import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";

const ChangePassword: NextPage<{ passwordToken: string }> = ({
  passwordToken,
}) => {
  const handleSubmit = async (newPassword: any, { setErrors }: any) => {
    console.log(newPassword);
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

            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
              cursor="pointer"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    passwordToken: query.passwordToken as string,
  };
};

export default ChangePassword;
