import { Box, Button, Spinner } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import {
  PostInput,
  useCreatePostMutation,
  useMeQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);

  const [, createPost] = useCreatePostMutation();

  const handleSubmit = async (values: PostInput) => {
    console.log(values);
    const { error } = await createPost({ input: values });
    if (!error) {
      // No error :)
      router.push("/");
    }
  };

  let C =
    fetching || !data?.me ? (
      <Spinner size="xl" />
    ) : (
      <Formik initialValues={{ title: "", text: "" }} onSubmit={handleSubmit}>
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    );

  return <Layout variant="small">{C}</Layout>;
};

export default withUrqlClient(createUrqlClient)(CreatePost);
