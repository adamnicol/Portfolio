import { Comment } from "./Comment";
import { CommentEntry } from "./CommentEntry";
import { INewsPost } from "../../api/interfaces";
import { Pagination } from "../../components";
import { useGetComments } from "../../api/queries/news.queries";
import { usePagination } from "../../hooks";

const COMMENTS_PER_PAGE = 5;

export function CommentSection(props: { post: INewsPost }) {
  const { page, limit, filter } = usePagination(COMMENTS_PER_PAGE);
  const { data, isSuccess } = useGetComments(filter, props.post);

  return (
    <>
      <h4>Comments</h4>
      <CommentEntry post={props.post} filters={filter} />

      {isSuccess && (
        <div className="mt-4">
          {data.comments.map((comment, index) => {
            return <Comment key={index} content={comment} />;
          })}

          {data.total > limit && (
            <Pagination
              className="pagination-sm justify-content-end mt-4"
              currentPage={page}
              totalPages={Math.ceil(data.total / limit)}
              onPageChanged={() => window.scrollTo(0, 0)}
            />
          )}
        </div>
      )}
    </>
  );
}
