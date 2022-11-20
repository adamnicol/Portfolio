import Login from "../Login";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatRelative } from "../../utils/dateFormatter";
import { INewsPost } from "../../api/interfaces";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLikePost } from "../../api/queries/news.queries";
import { useModal } from "../../context/ModalContext";

function NewsPost(props: { content: INewsPost; limit?: number }) {
  const { content: post, limit } = props;

  const url = `/news/${post.slug}`;
  const content =
    limit && post.content.length > limit
      ? post.content.substring(0, Math.min(post.content.length, limit)).trim()
      : post.content;

  const auth = useAuth();
  const modal = useModal();
  const likePost = useLikePost(post);

  function handleLikePost() {
    if (auth.user) {
      likePost.mutate(!post.liked);
    } else {
      modal.show(<Login />);
    }
  }

  return (
    <article className="mt-3">
      <Link to={url}>
        <h4>{post.title}</h4>
      </Link>
      <p>
        {content}
        {limit && post.content.length > limit && (
          <span>
            ...
            <Link to={url} className="ms-2">
              Read more
            </Link>
          </span>
        )}
      </p>
      <hr className="mb-2" />
      <div className="d-flex text-primary text-small">
        <Link to={url} title="Comments">
          <FontAwesomeIcon icon={faMessage} size="sm" /> {post.comments}
        </Link>

        <span className="me-1">
          {likePost.isLoading ? (
            <span className="spinner-border spinner-border-sm ms-2" />
          ) : (
            <a className="ms-2" onClick={handleLikePost}>
              <FontAwesomeIcon
                icon={post.liked ? faHeartSolid : faHeart}
                size="sm"
                title="Like Post"
              />
            </a>
          )}
        </span>
        {post.likes}

        <span className="ms-auto text-secondary text-small">
          Posted {formatRelative(post.createdAt)}
        </span>
      </div>
    </article>
  );
}

export default NewsPost;
