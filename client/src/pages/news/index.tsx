import { NewsFeed } from "./NewsFeed";
import { useSearchParams } from "react-router-dom";

export * from "./Article";
export * from "./NewsFeed";
export * from "./NewsFilters";

export function News() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  return (
    <>
      {tag && <h1>Tag: {decodeURIComponent(tag)}</h1>}
      <NewsFeed />
    </>
  );
}
