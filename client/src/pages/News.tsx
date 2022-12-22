import NewsFeed from "./news/NewsFeed";
import { useSearchParams } from "react-router-dom";

function News() {
  const [searchParams] = useSearchParams();

  const tag = searchParams.get("tag");

  return (
    <div>
      {tag ? <h1>News: {decodeURIComponent(tag)}</h1> : <h1>News</h1>}
      <NewsFeed />
    </div>
  );
}

export default News;
