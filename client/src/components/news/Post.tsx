import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils/dateFormatter";
import { INewsPost } from "../../api/interfaces";
import { Link } from "react-router-dom";
import { useLikePost } from "../../api/queries/news.queries";

function NewsPost(props: { content: INewsPost }) {
  const post = props.content;
  const maxLength = 300;
  const url = `/news/${post.slug}`;
  const content =
    post.content.length > maxLength
      ? post.content.substring(0, Math.min(post.content.length, maxLength))
      : post.content;

  const likePost = useLikePost(post);

  function handleLikePost() {
    // TODO: Check user logged in.
    likePost.mutate();
  }

  return (
    <article className="mt-3">
      <Link to={url}>
        <h4>{post.title}</h4>
      </Link>
      <p>
        {content}
        {post.content.length > maxLength && (
          <Link to={url} className="ms-2">
            Read more
          </Link>
        )}
      </p>
      <hr className="mb-2" />
      <div className="d-flex text-primary">
        <Link to={url} title="Comments">
          <FontAwesomeIcon icon={faMessage} size="sm" /> {post.comments}
        </Link>
        <a className="ms-2" onClick={handleLikePost}>
          <FontAwesomeIcon
            icon={post.liked ? faHeartSolid : faHeart}
            size="sm"
            title="Like Post"
          />{" "}
          {post.likes}
        </a>
        <span className="ms-auto text-secondary">
          Posted {formatDate(post.createdAt)}
        </span>
      </div>
    </article>
  );
}

export default NewsPost;
