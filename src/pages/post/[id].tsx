import React from 'react';
import Layout from './../../components/Layout';
import { Box, Heading, Spinner } from '@chakra-ui/core';
import { useFetchPost } from './../../utils/useFetchPost';
import { withApollo } from '../../utils/withApollo';

const Post: React.FC<{}> = () => {
  const { data, loading, error } = useFetchPost();
  let body: any = '';

  if (loading) {
    body = <Spinner />;
  } else if (!data?.post) {
    body = <div>Could not find the post</div>;
  } else if (error) {
    body = <div>{error.message}</div>;
  } else {
    body = (
      <Box>
        <Heading mb={4}>{data.post.title}</Heading>
        <p>{data.post.text}</p>
      </Box>
    );
  }

  return <Layout>{body}</Layout>;
};

export default withApollo({ ssr: true })(Post);
