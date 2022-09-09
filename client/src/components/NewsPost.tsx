import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../utils/dateFormatter";
import { News } from "../interfaces";

function NewsPost(props: { content: News }) {
  const post = props.content;
  const maxLength = 300;
  const url = `/news/post/${post._id}`;
  const content =
    post.content.length > maxLength
      ? post.content.substring(0, Math.min(post.content.length, maxLength))
      : post.content;

  return (
    <article className="mt-3">
      <Link to={url}>
        <h2>{post.title}</h2>
      </Link>
      <p>
        {content}
        {post.content.length > maxLength && (
          <Link to={url} className="ms-2">
            Read more
          </Link>
        )}
      </p>
      <hr />
      <div className="d-flex text-primary">
        <Link to={url}>
          <FontAwesomeIcon icon={faMessage} size="sm" /> {post.comments?.length}
        </Link>
        <Link to="#" className="ms-2">
          <FontAwesomeIcon icon={faHeart} size="sm" /> {post.likes}
        </Link>
        <span className="ms-auto text-secondary">
          Posted {formatDate(post.createdAt)}
        </span>
      </div>
    </article>
  );
}

export default NewsPost;
