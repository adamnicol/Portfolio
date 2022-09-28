import Comment from "./Comment";
import NewsPost from "./NewsPost";
import Pagination from "../common/Pagination";
import useAxios from "../hooks/useAxios";
import { IComment, INewsPost } from "../../interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const commentsPerPage = 5;

function ViewPost() {
  const [post, setPost] = useState<INewsPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [comment, setComment] = useState<string>("");

  const axios = useAxios();
  const { slug } = useParams();

  useEffect(() => getNewsPost(), [slug]);
  useEffect(() => getComments(), [currentPage, post]);

  function getNewsPost() {
    axios.get(`/news/${slug}`).then((response) => setPost(response.data));
  }

  function getComments() {
    const params = {
      limit: commentsPerPage,
      offset: (currentPage - 1) * commentsPerPage,
    };

    if (post) {
      axios.get(`/news/${post._id}/comments`, { params }).then((response) => {
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
            disabled={comment.length < 5}
          />
        </div>
      </div>

      {comments && (
        <section className="mt-4">
          {comments.map((comment, index) => {
            return <Comment key={index} content={comment} />;
          })}

          {totalPages > 1 && (
            <Pagination
              className="pagination-sm justify-content-end mt-4"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChanged={setCurrentPage}
            />
          )}
        </section>
      )}
    </div>
  );
}

export default ViewPost;
