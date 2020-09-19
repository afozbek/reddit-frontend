import React from "react";

import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "./../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Login: React.FC<{}> = (props) => {
  const [, loginMutation] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (values: any, { setErrors }: any) => {
    const response = await loginMutation({ options: values });

    if (response.data?.login?.errors) {
      setErrors(toErrorMap(response.data?.login.errors));
    } else if (response.data?.login?.user) {
      // worked
      console.log(response.data?.login.user);
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
              // isLoading={isSubmitting}
              type="submit"
              cursor="pointer"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
