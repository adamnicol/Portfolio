import { formatDate } from "../../utils/dateFormatter";
import { IComment } from "../../api/interfaces";

function Comment(props: { content: IComment }) {
  const { createdAt, user, content } = props.content;
  return (
    <article className="row gx-3 mt-3">
      <div className="col col-auto pt-1">
        <img src={require("../../assets/avatar.jpg")} alt="avatar" />
      </div>
      <div className="col">
        <a className="link-primary fw-bold">{user.username}</a>
        <span className="text-secondary text-small">
          {" "}
          - {formatDate(createdAt)}
        </span>
        <p className="text-small mb-0">{content}</p>
      </div>
    </article>
  );
}

export default Comment;
