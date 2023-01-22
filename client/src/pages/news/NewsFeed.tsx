import { NewsPost } from "./NewsPost";
import { Pagination } from "../../components";
import { useGetNews } from "../../api/queries/news.queries";
import { usePagination } from "../../hooks";
import { useSearchParams } from "react-router-dom";

const POSTS_PER_PAGE = 5;
const MAX_POST_LENGTH = 400;

export function NewsFeed() {
  const [searchParams] = useSearchParams();
  const { page, limit, offset } = usePagination(POSTS_PER_PAGE);

  const tag = searchParams.get("tag");
  const news = useGetNews({ limit, offset, tag });

  if (news.isLoading) {
    return (
      <>
        <div className="spinner-border spinner-border-sm text-primary" />
        <span className="ms-2">Loading</span>
      </>
    );
  }

  if (news.isSuccess) {
    return (
      <div className="mt-4">
        {news.data.posts.map((post, index) => {
          return <NewsPost key={index} post={post} limit={MAX_POST_LENGTH} />;
        })}

        {news.data.total > limit && (
          <Pagination
            className="pagination-sm justify-content-end mt-4"
            currentPage={page}
            totalPages={Math.ceil(news.data.total / limit)}
            onPageChanged={() => window.scrollTo(0, 0)}
          />
        )}
      </div>
    );
  }

  return <p>Error loading news feed.</p>;
}
