import React from "react";

import { Form, Formik } from "formik";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "./../components/InputField";

interface Props {}

const Register: React.FC<Props> = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
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
              isLoading={isSubmitting}
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
