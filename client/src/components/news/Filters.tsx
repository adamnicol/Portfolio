import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { INewsPost, ITag } from "../../interfaces";
import { Link } from "react-router-dom";
import axios from "axios";

function NewsFilters() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [topPosts, setTopPosts] = useState<INewsPost[]>([]);

  useEffect(() => getContent(), []);

  function getContent() {
    axios.get("/news/top").then((response) => setTopPosts(response.data));
    axios
      .get("/news/tags", { params: { limit: 10 } })
      .then((response) => setTags(response.data));
  }

  return (
    <div>
      <h2>Tags</h2>
      <section className="d-flex flex-wrap">
        <Link to="/news" className="tag">
          all
        </Link>

        {tags.map((tag, index) => (
          <Link
            key={index}
            className="tag"
            to={"/news/?tag=" + encodeURIComponent(tag.name)}
          >
            {tag.name}
          </Link>
        ))}
      </section>

      <section className="mt-5">
        <h2>Top Posts</h2>
        <ul className="list-unstyled">
          {topPosts.map((post, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faArrowRight} className="bullet" />
              <Link to={"/news/" + post.slug} className="fw-bold">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default NewsFilters;
