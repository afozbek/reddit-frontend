import React from "react";

import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "./../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Register: React.FC<Props> = (props) => {
  const [, registerMutation] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (values: any, { setErrors }: any) => {
    const response = await registerMutation(values);

    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      // worked
      console.log(response.data?.register.user);
      router.push("/");
    }
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
