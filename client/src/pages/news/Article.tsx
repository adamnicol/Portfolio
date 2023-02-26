import { CommentSection } from "./CommentSection";
import { ErrorBoundary } from "@components";
import { NewsPost } from "./Post";
import { useGetPost } from "@api/queries/news.queries";
import { useParams } from "react-router-dom";

export function Article() {
  const { slug } = useParams();
  const { data, isLoading, isSuccess } = useGetPost(slug);

  if (isLoading) {
    return (
      <>
        <div className="spinner-border spinner-border-sm text-primary" />
        <span className="ms-2">Loading</span>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <NewsPost post={data} />

        <section className="mt-4">
          <ErrorBoundary fallback={<p>Error loading comments.</p>}>
            <CommentSection post={data} />
          </ErrorBoundary>
        </section>
      </>
    );
  }

  return <p>Post not found</p>;
}
