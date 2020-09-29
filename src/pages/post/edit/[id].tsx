import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import Layout from "./../../../components/Layout";
import { Box, Button, Spinner } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "../../../components/InputField";
import { PostInput } from "../../../generated/graphql";
import { usePostQuery } from "./../../../generated/graphql";
import { NextRouter, useRouter } from "next/router";

interface UpdatePostProps {
  router: NextRouter;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ ...props }) => {
  console.log(props);
  const router = useRouter();
  const [{ data, fetching }] = usePostQuery({
    variables: {
      postId: router.query.id ? parseInt(router.query.id as string) : -1,
    },
  });

  console.log(fetching);

  const handleSubmit = (values: PostInput) => {};

  const C = fetching ? (
    <Spinner size="lg" />
  ) : (
    <Formik
      initialValues={{
        title: data?.post?.title || "",
        text: data?.post?.text || "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            placeholder="Please enter title"
            name="title"
            label="Title"
          />

          <Box mt={4}>
            <InputField
              placeholder="Please enter text"
              name="text"
              textArea
              label="Text"
              height="300px"
            />
          </Box>

          <Button
            mt={4}
            width="100%"
            variantColor="teal"
            isLoading={isSubmitting}
            type="submit"
            cursor="pointer"
          >
            Update Post
          </Button>
        </Form>
      )}
    </Formik>
  );

  return <Layout variant="small">{C}</Layout>;
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
