import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useGetTopPosts, useGetTopTags } from "../../api/queries/news.queries";

export function NewsFilters() {
  const tags = useGetTopTags(10);
  const posts = useGetTopPosts(10);

  return (
    <>
      <h2>Tags</h2>
      <section className="d-flex flex-wrap">
        <Link to="/" className="tag">
          all
        </Link>
        {tags.data?.map((tag, index) => (
          <Link
            key={index}
            className="tag"
            to={`/news/?tag=${encodeURIComponent(tag.name)}`}
          >
            {tag.name}
          </Link>
        ))}
      </section>

      <section className="mt-4">
        <h2>Top Posts</h2>
        <ul className="list-unstyled">
          {posts.data?.map((post, index) => (
            <li key={index} className="animate-bullet">
              <FontAwesomeIcon icon={faArrowRight} className="bullet" />
              <Link to={`/news/${post.slug}`} className="fw-bold">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
