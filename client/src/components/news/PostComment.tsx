import Login from "../Login";
import { INewsFilters, INewsPost } from "../../api/interfaces";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { usePostComment } from "../../api/queries/news.queries";
import { useState } from "react";

function PostComment(props: { post: INewsPost; filters: INewsFilters }) {
  const { post, filters } = props;
  const [comment, setComment] = useState<string>("");

  const auth = useAuth();
  const modal = useModal();
  const postComment = usePostComment(filters, post);

  function handlePostComment() {
    if (auth.user) {
      postComment.mutate({ post, comment });
      setComment("");
    } else {
      modal.show(<Login />);
    }
  }

  return (
    <div className="row gx-3">
      <div className="col col-auto">
        <img src={require("../../assets/avatar.jpg")} alt="avatar" />
      </div>
      <div className="col">
        <textarea
          name="comment"
          className="form-control"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm px-4 mt-2"
          disabled={postComment.isLoading || comment.trim().length < 5}
          onClick={handlePostComment}
        >
          <span className="align-middle">
            {postComment.isLoading && (
              <span className="spinner-border spinner-border-sm align-middle me-1" />
            )}
            Post
          </span>
        </button>
      </div>
    </div>
  );
}

export default PostComment;
