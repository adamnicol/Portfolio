import { useState, useEffect } from "react";
import { News } from "../interfaces";
import NewsPost from "./NewsPost";
import axios from "axios";

function Home() {
  const [news, setNews] = useState<News[]>();

  useEffect(() => getNews(), []);

  function getNews() {
    axios.get("/api/news").then((res) => setNews(res.data));
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
    </div>
  );
}

export default Home;
