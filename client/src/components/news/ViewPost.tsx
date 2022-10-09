import Comment from "./Comment";
import NewsPost from "./Post";
import Pagination from "../common/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetComments,
  useGetPost,
  usePostComment,
} from "../../api/queries/news.queries";

const commentsPerPage = 5;

function ViewPost() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState<string>("");

  const page = searchParams.get("page") || 1;
  const offset = (Number(page) - 1) * commentsPerPage;

  const { data: post } = useGetPost(slug);
  const comments = useGetComments(commentsPerPage, offset, post);
  const postComment = usePostComment(slug);

  function handlePostComment() {
    if (post && comment.trim().length >= 5) {
      postComment.mutate({ post, comment });
    }
  }

  return (
    <div>
      {post && <NewsPost content={post} />}

      <div className="row mt-4 gx-3">
        <h5>Comments</h5>
        <div className="col col-auto">
          <img src={require("../../images/avatar.jpg")} alt="avatar" />
        </div>
        <div className="col">
          <textarea
            name="comment"
            className="form-control"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            type="button"
            className="btn btn-primary btn-sm px-4 mt-2"
            value="Post"
            onClick={handlePostComment}
            disabled={comment.trim().length < 5}
          />
        </div>
      </div>

      {comments && (
        <section className="mt-4">
          {comments.data?.comments.map((comment, index) => {
            return <Comment key={index} content={comment} />;
          })}

          {comments.data && comments.data.total > commentsPerPage && (
            <Pagination
              className="pagination-sm justify-content-end mt-4"
              currentPage={Number(page)}
              totalPages={Math.ceil(comments.data.total / commentsPerPage)}
              onPageChanged={() => {}}
            />
          )}
        </section>
      )}
    </div>
  );
}

export default ViewPost;
