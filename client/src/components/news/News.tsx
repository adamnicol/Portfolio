import axios from "axios";
import NewsPost from "./NewsPost";
import Pagination from "../common/Pagination";
import { INewsPost } from "../../interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const postsPerPage = 5;

function News() {
  const [news, setNews] = useState<INewsPost[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const tag = searchParams.get("tag");
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * postsPerPage;

  useEffect(() => getNews(), [searchParams]);

  function getNews() {
    axios
      .get("/news", { params: { tag, limit: postsPerPage, offset } })
      .then((response) => {
        setNews(response.data.posts);
        setTotalPages(Math.ceil(response.data.total / postsPerPage));
      });
  }

  function handlePageChanged(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  }

  return (
    <div>
      {news?.map((post, index) => {
        return <NewsPost key={index} content={post} />;
      })}

      {news && totalPages > 1 && (
        <Pagination
          className="pagination-sm justify-content-end mt-4"
          currentPage={page}
          totalPages={totalPages}
          onPageChanged={handlePageChanged}
        />
      )}
    </div>
  );
}

export default News;
