import * as date from "../../utils/dateFormatter";
import avatar from "../../assets/avatar.jpg";
import { IComment } from "../../api/interfaces";
import { useModal } from "../../hooks";
import { UserProfile } from "../UserProfile";

type CommentProps = {
  content: IComment;
};

export function Comment(props: CommentProps) {
  const { createdAt, user, content } = props.content;

  const modal = useModal();
  const showUserProfile = () =>
    modal.show(<UserProfile user={user.username} />);

  return (
    <article className="row gx-3 mt-3">
      <div className="col col-auto pt-1">
        <img src={avatar} width={40} height={40} alt="avatar" />
      </div>
      <div className="col">
        <a
          className="link-primary fw-bold"
          title="View Profile"
          onClick={showUserProfile}
        >
          {user.username}
        </a>
        <span className="text-secondary text-small ms-1">
          - {date.formatRelative(createdAt)}
        </span>
        <p className="text-small mb-0">{content}</p>
      </div>
    </article>
  );
}
