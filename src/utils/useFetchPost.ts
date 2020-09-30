import { usePostQuery } from "../generated/graphql";
import { useGetPostId } from "./useGetPostId";

export const useFetchPost = () => {
  const paramPostId = useGetPostId();

  return usePostQuery({
    pause: paramPostId === -1,
    variables: {
      postId: paramPostId,
    },
  });
};
