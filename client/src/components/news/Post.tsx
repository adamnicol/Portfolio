import useAxios from "../hooks/useAxios";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils/dateFormatter";
import { INewsPost } from "../../interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";

function NewsPost(props: { content: INewsPost }) {
  const post = props.content;
  const maxLength = 300;
  const url = `/news/${post.slug}`;
  const content =
    post.content.length > maxLength
      ? post.content.substring(0, Math.min(post.content.length, maxLength))
      : post.content;

  const [likedPost, setLikedPost] = useState<boolean>(post.liked);

  const axios = useAxios();

  function handleLikePost() {
    if (!post.liked) {
      axios
        .post(`/news/${post.id}/like`, { params: { value: true } })
        .then(() => {
          // TODO: Set this properly.
          post.likes++;
          post.liked = true;
          setLikedPost(true);
        });
    }
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
            icon={likedPost ? faHeartSolid : faHeart}
            size="sm"
            title="Like Post"
            onMouseOver={() => setLikedPost(true)}
            onMouseOut={() => setLikedPost(post.liked)}
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
