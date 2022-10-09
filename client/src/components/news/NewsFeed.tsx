import NewsPost from "./Post";
import Pagination from "../common/Pagination";
import { useSearchParams } from "react-router-dom";
import { useGetNews } from "../../api/queries/news.queries";

const postsPerPage = 5;

function NewsFeed() {
  const [searchParams] = useSearchParams();

  const tag = searchParams.get("tag");
  const page = searchParams.get("page") || 1;
  const offset = (Number(page) - 1) * postsPerPage;

  const news = useGetNews({ limit: postsPerPage, offset, tag });

  if (news.isLoading) {
    return <p>Loading news...</p>;
  }

  return (
    <div>
      {news.data?.posts.map((post, index) => {
        return <NewsPost key={index} content={post} />;
      })}

      {news.data && news.data.total > postsPerPage && (
        <Pagination
          className="pagination-sm justify-content-end mt-4"
          currentPage={Number(page)}
          totalPages={Math.ceil(news.data.total / postsPerPage)}
          onPageChanged={() => {}}
        />
      )}
    </div>
  );
}

export default NewsFeed;
