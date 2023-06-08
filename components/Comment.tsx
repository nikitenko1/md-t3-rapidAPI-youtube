import { CommentWithPayload } from "types";
import Avatar from "./Avatar";
import ReactTimeAgo from "react-time-ago";

interface IProps {
  comment: CommentWithPayload;
}

const Comment = ({ comment }: IProps) => {
  return (
    <div className="flex items-center gap-x-4">
      {/* image         String? */}
      <Avatar width={30} height={30} src={comment?.author?.image ?? ""} />
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          {/* name          String? */}
          <p className="font-semibold text-white">{comment?.author?.name}</p>
          <ReactTimeAgo
            className="text-sm text-gray-400"
            // createdAt DateTime @default(now())
            date={comment?.createdAt}
          />
        </div>
        {/* text      String */}
        <p className="text-white">{comment?.text}</p>
      </div>
    </div>
  );
};

export default Comment;
