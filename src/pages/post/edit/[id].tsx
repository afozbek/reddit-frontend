import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import Layout from "./../../../components/Layout";
import { Box, Button, Spinner } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "../../../components/InputField";
import { PostInput, useUpdatePostMutation } from "../../../generated/graphql";
import { NextRouter, useRouter } from "next/router";
import { useFetchPost } from "../../../utils/useFetchPost";
import { useGetPostId } from "./../../../utils/useGetPostId";

interface UpdatePostProps {
  router: NextRouter;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ ...props }) => {
  const router = useRouter();
  const postId = useGetPostId();

  const [{ data, fetching, error }] = useFetchPost();

  const [, updatePost] = useUpdatePostMutation();

  const handleSubmit = async (values: PostInput) => {
    const { text, title } = values;
    await updatePost({
      postId,
      text,
      title,
    });

    router.push("/");
  };

  let body: any = "";
  if (fetching) {
    body = <Spinner />;
  } else if (!data?.post) {
    body = <div>Could not find the post</div>;
  } else if (error) {
    body = <div>{error.message}</div>;
  } else {
    body = (
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
  }

  return <Layout variant="small">{body}</Layout>;
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
