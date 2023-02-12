import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export type MarkdownProps = {
  children: string;
  className?: string;
};

export function Markdown(props: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{ a: LinkComponent }}
      className={props.className}
    >
      {props.children}
    </ReactMarkdown>
  );
}

// Render links as <Link> if they are internal, otherwise <a>
function LinkComponent(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || "";

  if (href.startsWith("/")) {
    return <Link to={href}>{props.children}</Link>;
  } else {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }
}

export default Markdown;
