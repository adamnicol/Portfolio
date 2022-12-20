import { formatRelative } from "../../utils/dateFormatter";
import { IComment } from "../../api/interfaces";
import { useModal } from "../../hooks";
import { UserProfile } from "../UserProfile";

function Comment(props: { content: IComment }) {
  const { createdAt, user, content } = props.content;
  const modal = useModal();

  return (
    <article className="row gx-3 mt-3">
      <div className="col col-auto pt-1">
        <img src={require("../../assets/avatar.jpg")} alt="avatar" />
      </div>
      <div className="col">
        <a
          className="link-primary fw-bold"
          title="View Profile"
          onClick={() => modal.show(<UserProfile user={user.username} />)}
        >
          {user.username}
        </a>
        <span className="text-secondary text-small ms-1">
          - {formatRelative(createdAt)}
        </span>
        <p className="text-small mb-0">{content}</p>
      </div>
    </article>
  );
}

export default Comment;
