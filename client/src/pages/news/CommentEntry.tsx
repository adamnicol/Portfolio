import avatar from "../../assets/avatar.jpg";
import { INewsFilters, INewsPost } from "../../api/interfaces";
import { usePostComment } from "../../api/queries/news.queries";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { useState } from "react";

type CommentEntryProps = {
  post: INewsPost;
  filters: INewsFilters;
};

export function CommentEntry(props: CommentEntryProps) {
  const [comment, setComment] = useState<string>("");

  const { post, filters } = props;
  const { mutate, isLoading } = usePostComment(filters, post);
  const { requireLogin } = useRequireLogin();

  function submitComment() {
    requireLogin(() => {
      mutate({ post, comment });
      setComment("");
    });
  }

  return (
    <div className="row gx-3">
      <div className="col col-auto">
        <img src={avatar} width={40} height={40} alt="avatar" />
      </div>
      <div className="col">
        <textarea
          name="comment"
          className="form-control text-small"
          placeholder="Leave a comment..."
          value={comment}
          maxLength={500}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary btn-sm px-4 mt-2 me-auto"
            disabled={isLoading || comment.trim().length < 5}
            onClick={submitComment}
          >
            <span className="align-middle">
              {isLoading && (
                <span className="spinner-border spinner-border-sm align-middle me-1" />
              )}
              Post
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
