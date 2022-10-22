import Login from "../Login";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils/dateFormatter";
import { INewsPost } from "../../api/interfaces";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLikePost } from "../../api/queries/news.queries";
import { useModal } from "../../context/ModalContext";

function NewsPost(props: { content: INewsPost }) {
  const post = props.content;
  const maxLength = 300;
  const url = `/news/${post.slug}`;
  const content =
    post.content.length > maxLength
      ? post.content.substring(0, Math.min(post.content.length, maxLength))
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
        <h3>{post.title}</h3>
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
          Posted {formatDate(post.createdAt)}
        </span>
      </div>
    </article>
  );
}

export default NewsPost;
