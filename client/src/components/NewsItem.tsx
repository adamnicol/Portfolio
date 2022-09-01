import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faHeart } from "@fortawesome/free-regular-svg-icons";

function NewsItem(props: { title: string; body: string }) {
  return (
    <article className="mt-3">
      <Link to="/">
        <h2>{props.title}</h2>
      </Link>
      <p>{props.body}</p>
      <hr />
      <div className="d-flex text-secondary">
        <Link to="/">
          <FontAwesomeIcon icon={faMessage} size="sm" /> 1
        </Link>
        <span className="ms-2">
          <FontAwesomeIcon icon={faHeart} size="sm" /> 0
        </span>
        <span className="ms-auto">September 1st, 2022</span>
      </div>
    </article>
  );
}

export default NewsItem;
