import { formatDate, formatRelative } from "../utils/dateFormatter";
import { useGetUserProfile } from "../api/queries/user.queries";

export function UserProfile(props: { user: string }) {
  const user = useGetUserProfile(props.user);

  return (
    <div>
      <div className="hstack gap-3">
        <img src={require(`../assets/avatar.jpg`)} alt="avatar" />
        <h1 className="my-auto">{props.user}</h1>
      </div>

      <ul className="mt-3">
        <li>Active: {String(user.data?.active)}</li>
        <li>Role: {user.data?.role}</li>
        <li>Registered: {user.data && formatDate(user.data.createdAt)}</li>
        <li>Last login: {user.data && formatRelative(user.data.lastLogin)}</li>
        <li>Posts: {user.data?.posts}</li>
        <li>Posts liked: {user.data?.likes}</li>
        <li>Comments: {user.data?.comments}</li>
      </ul>
    </div>
  );
}
