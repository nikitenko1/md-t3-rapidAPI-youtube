import { toast } from "react-hot-toast";
import { trpc } from "utils/trpc";

export default function useVideoComments(videoId: string) {
  const { data: comments } = trpc.comment.getVideoComments.useQuery(
    {
      videoId,
    },
    {
      refetchOnMount: true,
    }
  );

  const utils = trpc.useContext();

  const { mutateAsync: addComment } = trpc.comment.createComment.useMutation({
    // Always refetch after error or success:
    onSettled: () => {
      utils.comment.getVideoComments.invalidate({ videoId });
    },
  });

  const handleAddComment = async (text: string) => {
    await toast.promise(addComment({ videoId, text }), {
      loading: "Posting comment",
      success: "Comment successfully posted",
      error: (err) => `Oops... something went wrong ${err}`,
    });
  };

  return { comments, handleAddComment };
}
