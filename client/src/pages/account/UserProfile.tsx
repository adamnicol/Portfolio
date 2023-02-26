import * as date from "@utils/dateFormatter";
import avatar from "@assets/avatar_large.jpg";
import { useGetUserProfile } from "@api/queries/user.queries";

export function UserProfile(props: { user: string }) {
  const user = useGetUserProfile(props.user)?.data;

  return (
    <div className="row me-4">
      <div className="col col-auto divider">
        <img
          src={avatar}
          alt="avatar"
          width={85}
          height={100}
          className="img-thumbnail"
        />
        <div className="text-center text-primary mt-1">
          {user?.role ?? "User"}
        </div>
      </div>

      <div className="col ms-1">
        <h1>{props.user}</h1>
        <ul className="list-unstyled">
          <li>Active: {String(user?.active)}</li>
          <li>Registered: {user && date.formatDate(user.createdAt)}</li>
          <li>
            <span className="me-1">Last login:</span>
            {user?.lastLogin ? date.formatRelative(user.lastLogin) : "never"}
          </li>
          <li>Posts: {user?.posts}</li>
          <li>Posts liked: {user?.likes}</li>
          <li>Comments: {user?.comments}</li>
        </ul>
      </div>
    </div>
  );
}
