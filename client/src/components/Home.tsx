import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { News } from "../interfaces";
import NewsPost from "./NewsPost";
import Pagination from "./Pagination";
import axios from "axios";

function Home() {
  const [news, setNews] = useState<News[]>();
  const [newsCount, setNewsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const postsPerPage = 5;
  const totalPages = Math.ceil(newsCount / postsPerPage);
  const offset = (currentPage - 1) * postsPerPage;

  const { tag = "all" } = useParams();

  useEffect(() => getNews(), [currentPage, tag]);
  useEffect(() => getNewsCount(), [tag]);
  useEffect(() => setCurrentPage(1), [tag]);

  function getNewsCount() {
    axios
      .get(`/news/count/${tag}`)
      .then((response) => setNewsCount(response.data));
  }

  function getNews() {
    axios
      .get(`/news/${tag}`, { params: { limit: postsPerPage, offset } })
      .then((response) => setNews(response.data))
      .finally(() => window.scrollTo(0, 0));
  }

  return (
    <div>
      <h1>Welcome</h1>
      <div className="callout">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          hic nobis aliquid iure laborum eum, fugit obcaecati maiores fuga illum
          nemo, similique eaque ratione quo inventore eos error soluta. Eius?
        </p>
      </div>

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

export default Home;
