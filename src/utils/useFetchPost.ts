import { usePostQuery } from '../generated/graphql';
import { useGetPostId } from './useGetPostId';

export const useFetchPost = () => {
  const paramPostId = useGetPostId();

  return usePostQuery({
    skip: paramPostId === -1,
    variables: {
      postId: paramPostId,
    },
  });
};
