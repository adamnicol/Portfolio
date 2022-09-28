import Comment from "./Comment";
import NewsPost from "./Post";
import Pagination from "../common/Pagination";
import useAxios from "../hooks/useAxios";
import { IComment, INewsPost } from "../../interfaces";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const commentsPerPage = 5;

function ViewPost() {
  const [post, setPost] = useState<INewsPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [searchParams] = useSearchParams();

  const { slug } = useParams();
  const axios = useAxios();
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * commentsPerPage;

  useEffect(() => getNewsPost(), [slug]);
  useEffect(() => getComments(), [page, post]);

  function getNewsPost() {
    axios.get(`/news/${slug}`).then((response) => setPost(response.data));
  }

  function getComments() {
    if (post) {
      axios
        .get(`/news/${post._id}/comments`, {
          params: { limit: commentsPerPage, offset },
        })
        .then((response) => {
          setComments(response.data.comments);
          setTotalPages(Math.ceil(response.data.total / commentsPerPage));
        });
    }
  }

  function postComment() {
    if (post && comment.trim().length > 5) {
      axios.post(`/news/${post._id}/comments`, { comment }).then((response) => {
        setComment("");
        setComments((prev) => [response.data, ...prev]);
        setPost({ ...post, comments: post.comments + 1 });
      });
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
            onClick={postComment}
            disabled={comment.trim().length < 5}
          />
        </div>
      </div>

      {comments && (
        <section className="mt-4">
          {comments.map((comment, index) => {
            return <Comment key={index} content={comment} />;
          })}

          {comments.length > 0 && totalPages > 1 && (
            <Pagination
              className="pagination-sm justify-content-end mt-4"
              currentPage={page}
              totalPages={totalPages}
              onPageChanged={() => setComments([])}
            />
          )}
        </section>
      )}
    </div>
  );
}

export default ViewPost;
