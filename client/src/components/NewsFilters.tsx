import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { News } from "../interfaces";
import axios from "axios";

function NewsFilters() {
  const [tags, setTags] = useState<string[]>([]);
  const [topPosts, setTopPosts] = useState<News[]>([]);

  useEffect(() => loadContent(), []);

  function loadContent() {
    axios.get("/news/top/10").then((response) => setTopPosts(response.data));
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

        {tags.map((tag, i) => (
          <Link key={i} className="tag" to={"/news/" + encodeURIComponent(tag)}>
            {tag}
          </Link>
        ))}
      </section>

      <section className="mt-5">
        <h2>Top Posts</h2>
        <ul className="list-unstyled">
          {topPosts.map((post, i) => (
            <li key={i}>
              <FontAwesomeIcon icon={faArrowRight} className="bullet" />
              <Link to={"/news/post/" + post._id} className="fw-bold">
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
