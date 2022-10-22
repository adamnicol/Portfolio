import Comment from "./Comment";
import NewsPost from "./Post";
import Pagination from "../common/Pagination";
import PostComment from "./PostComment";
import { useGetComments, useGetPost } from "../../api/queries/news.queries";
import { useParams, useSearchParams } from "react-router-dom";

const commentsPerPage = 5;

function ViewPost() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * commentsPerPage;
  const filters = { limit: commentsPerPage, offset };

  const { data: post, isLoading } = useGetPost(slug);
  const { data: comments } = useGetComments(filters, post);

  if (isLoading) {
    return (
      <div>
        <div className="spinner-border spinner-border-sm text-primary" />
        <span className="ms-2">Loading</span>
      </div>
    );
  }

  return (
    <div>
      {post && <NewsPost content={post} />}

      {comments && (
        <section className="mt-4">
          <h4>Comments</h4>
          {post && <PostComment post={post} filters={filters} />}

          <div className="mt-4">
            {comments.comments.map((comment, index) => {
              return <Comment key={index} content={comment} />;
            })}

            {comments.total > commentsPerPage && (
              <Pagination
                className="pagination-sm justify-content-end mt-4"
                currentPage={Number(page)}
                totalPages={Math.ceil(comments.total / commentsPerPage)}
                onPageChanged={() => window.scrollTo(0, 0)}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default ViewPost;
