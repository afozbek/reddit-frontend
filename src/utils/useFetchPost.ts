import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";

export const useFetchPost = () => {
  const router = useRouter();

  const paramPostId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  return usePostQuery({
    pause: paramPostId === -1,
    variables: {
      postId: paramPostId,
    },
  });
};
