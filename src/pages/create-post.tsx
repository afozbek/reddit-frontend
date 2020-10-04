import { Box, Button, Spinner } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import {
  PostInput,
  useCreatePostMutation,
  useMeQuery,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [data, router, loading]);

  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (values: PostInput) => {
    const { errors } = await createPost({
      variables: { input: values },
      update: (cache) => {
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (!errors) {
      // No error :)
      router.push('/');
    }
  };

  let C =
    loading || !data?.me ? (
      <Spinner size='xl' />
    ) : (
      <Formik initialValues={{ title: '', text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder='Please enter title'
              name='title'
              label='Title'
            />

            <Box mt={4}>
              <InputField
                placeholder='Please enter text'
                name='text'
                textArea
                label='Text'
              />
            </Box>

            <Button
              mt={4}
              width='100%'
              variantColor='teal'
              isLoading={isSubmitting}
              type='submit'
              cursor='pointer'
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    );

  return <Layout variant='small'>{C}</Layout>;
};

export default withApollo({ ssr: false })(CreatePost);
