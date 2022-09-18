import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { INews } from "../../interfaces";
import NewsPost from "./NewsPost";
import Pagination from "../common/Pagination";
import axios from "axios";

function News() {
  const [news, setNews] = useState<INews[]>();
  const [newsCount, setNewsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 5;
  const totalPages = Math.ceil(newsCount / postsPerPage);
  const offset = (currentPage - 1) * postsPerPage;

  const { tag } = useParams();

  useEffect(() => getNews(), [currentPage, tag]);
  useEffect(() => getNewsCount(), [tag]);
  useEffect(() => setCurrentPage(1), [tag]);

  function getNews() {
    axios
      .get("/news", { params: { limit: postsPerPage, offset, tag } })
      .then((response) => setNews(response.data))
      .finally(() => window.scrollTo(0, 0));
  }

  function getNewsCount() {
    axios
      .get("/news/count", { params: { tag } })
      .then((response) => setNewsCount(response.data));
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
