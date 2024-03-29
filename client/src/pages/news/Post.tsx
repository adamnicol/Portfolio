import * as date from "@utils/dateFormatter";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Markdown, ShareLinks } from "@components";
import { INewsPost } from "@interfaces";
import { Link } from "react-router-dom";
import { useLikePost } from "@api/queries/news.queries";
import { useRequireLogin } from "@hooks";
import { useState } from "react";

export type NewsPostProps = {
  post: INewsPost;
  limit?: number;
};

export function NewsPost(props: NewsPostProps) {
  const { post, limit } = props;
  const [showShareLinks, setShowShareLinks] = useState(false);

  const path = `/news/${post.slug}`;
  const content =
    limit && post.content.length > limit
      ? `${post.content
          .substring(0, Math.min(post.content.length, limit))
          .trim()}... [Read more](${path})`
      : post.content;

  const { requireLogin } = useRequireLogin();

  const likePost = useLikePost(post);
  const handleLikePost = () => {
    requireLogin(() => {
      likePost.mutate(!post.liked);
    });
  };

  return (
    <article className="mt-3">
      <div className="d-flex align-items-center mb-1">
        <Image id={`news/${post.image}`} width={25} height={25} />
        <Link to={path}>
          <h4 className="ms-2 mb-0">{post.title}</h4>
        </Link>
      </div>

      <Markdown>{content}</Markdown>

      <hr className="mb-2" />
      <div className="d-flex text-primary text-small">
        <Link to={path} title="Comments">
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

        <a className="ms-2" onClick={() => setShowShareLinks(!showShareLinks)}>
          <FontAwesomeIcon icon={faShare} size="sm" title="Share" />
        </a>

        <span className="ms-auto text-secondary text-small">
          Posted {date.formatRelative(post.createdAt)}
        </span>
      </div>

      <ShareLinks
        title={post.title}
        url={`${window.location.hostname}${path}`}
        visible={showShareLinks}
      />
    </article>
  );
}
