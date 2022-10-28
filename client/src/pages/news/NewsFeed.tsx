import NewsPost from "./Post";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useGetNews } from "../../api/queries/news.queries";

const postsPerPage = 5;
const maxLength = 300;

function NewsFeed() {
  const [searchParams] = useSearchParams();

  const tag = searchParams.get("tag");
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * postsPerPage;

  const news = useGetNews({ limit: postsPerPage, offset, tag });

  if (news.isLoading) {
    return (
      <div>
        <div className="spinner-border spinner-border-sm text-primary" />
        <span className="ms-2">Loading</span>
      </div>
    );
  }

  return (
    <div>
      {news.data?.posts.map((post, index) => {
        return <NewsPost key={index} content={post} limit={maxLength} />;
      })}

      {news.data && news.data.total > postsPerPage && (
        <Pagination
          className="pagination-sm justify-content-end mt-4"
          currentPage={page}
          totalPages={Math.ceil(news.data.total / postsPerPage)}
          onPageChanged={() => window.scrollTo(0, 0)}
        />
      )}
    </div>
  );
}

export default NewsFeed;
