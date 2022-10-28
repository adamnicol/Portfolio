import { formatDate } from "../../utils/dateFormatter";
import { IComment } from "../../api/interfaces";
import { Link } from "react-router-dom";

function Comment(props: { content: IComment }) {
  const { createdAt, user, content } = props.content;
  const profile = "/user/" + encodeURIComponent(user.username);

  return (
    <article className="row gx-3 mt-3">
      <div className="col col-auto pt-1">
        <Link to={profile}>
          <img src={require("../../assets/avatar.jpg")} alt="avatar" />
        </Link>
      </div>
      <div className="col">
        <Link to={profile} className="link-primary fw-bold">
          {user.username}
        </Link>
        <span className="text-secondary text-small ms-1">
          - {formatDate(createdAt)}
        </span>
        <p className="text-small mb-0">{content}</p>
      </div>
    </article>
  );
}

export default Comment;
