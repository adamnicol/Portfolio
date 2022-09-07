import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import { News } from "../interfaces";
import { formatDate } from "../utils/dateFormatter";

function NewsPost(props: { content: News }) {
  const post = props.content;

  return (
    <article className="mt-3">
      <Link to="/">
        <h2>{post.title}</h2>
      </Link>
      <p>{post.content}</p>
      <hr />
      <div className="d-flex text-secondary">
        <Link to="/">
          <FontAwesomeIcon icon={faMessage} size="sm" /> {post.comments?.length}
        </Link>
        <span className="ms-2">
          <FontAwesomeIcon icon={faHeart} size="sm" /> {post.likes}
        </span>
        <span className="ms-auto">Posted {formatDate(post.createdAt)}</span>
      </div>
    </article>
  );
}

export default NewsPost;
