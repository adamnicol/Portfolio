import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import { News } from "../interfaces";

function NewsPost(props: { content: News }) {
  const post = props.content;

  return (
    <article className="mt-3">
      <Link to="/">
        <h2>{post.title}</h2>
      </Link>
      <p>{post.body}</p>
      <hr />
      <div className="d-flex text-secondary">
        <Link to="/">
          <FontAwesomeIcon icon={faMessage} size="sm" /> {post.comments?.length}
        </Link>
        <span className="ms-2">
          <FontAwesomeIcon icon={faHeart} size="sm" /> {post.likes}
        </span>
        <span className="ms-auto">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}

export default NewsPost;
