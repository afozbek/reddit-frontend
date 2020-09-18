import React from "react";

import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "./../components/InputField";
import { useMutation, useQuery } from "urql";

interface Props {}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;

const Register: React.FC<Props> = (props) => {
  const [, registerMutation] = useMutation(REGISTER_MUTATION);

  const handleSubmit = (values) => {
    console.log(values);
    registerMutation(values);
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              placeholder="Username"
              name="username"
              label="Username"
            />

            <Box mt="20px">
              <InputField
                placeholder="Password"
                name="password"
                label="Password"
                type="password"
              />
            </Box>

            <Button
              mt={4}
              variantColor="teal"
              // isLoading={isSubmitting}
              type="submit"
              cursor="pointer"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
