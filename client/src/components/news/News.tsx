import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { INewsPost } from "../../interfaces";
import NewsPost from "./NewsPost";
import Pagination from "../common/Pagination";
import axios from "axios";

const postsPerPage = 5;

function News() {
  const [news, setNews] = useState<INewsPost[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { tag } = useParams();

  useEffect(() => getNews(), [currentPage, tag]);
  useEffect(() => setCurrentPage(1), [tag]);

  function getNews() {
    const offset = (currentPage - 1) * postsPerPage;
    const params = { limit: postsPerPage, offset, tag };

    axios.get("/news", { params }).then((response) => {
      setNews(response.data.posts);
      setTotalPages(Math.ceil(response.data.total / postsPerPage));
      window.scrollTo(0, 0);
    });
  }

  return (
    <div>
      {news?.map((post, index) => {
        return <NewsPost key={index} content={post} />;
      })}

      {news && totalPages > 1 && (
        <Pagination
          className="pagination-sm justify-content-end mt-4"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChanged={setCurrentPage}
        />
      )}
    </div>
  );
}

export default News;
