import { Collapse } from "react-bootstrap";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditShareButton,
  RedditIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const iconSize = 22;

function ShareLinks(props: { title: string; url: string; visible: boolean }) {
  return (
    <Collapse in={props.visible}>
      <ul className="list-unstyled list-inline m-0">
        <li title="Share on Facebook" className="list-inline-item m-2">
          <FacebookShareButton url={props.url} quote={props.title}>
            <FacebookIcon size={iconSize} round />
          </FacebookShareButton>
        </li>
        <li title="Share on Twitter" className="list-inline-item">
          <TwitterShareButton url={props.url} title={props.title}>
            <TwitterIcon size={iconSize} round />
          </TwitterShareButton>
        </li>
        <li title="Share on LinkedIn" className="list-inline-item">
          <LinkedinShareButton url={props.url} title={props.title}>
            <LinkedinIcon size={iconSize} round />
          </LinkedinShareButton>
        </li>
        <li title="Share on Reddit" className="list-inline-item">
          <RedditShareButton url={props.url} title={props.title}>
            <RedditIcon size={iconSize} round />
          </RedditShareButton>
        </li>
        <li title="Share by email" className="list-inline-item">
          <EmailShareButton url={props.url} subject={props.title}>
            <EmailIcon size={iconSize} round />
          </EmailShareButton>
        </li>
        <li title="Share on WhatsApp" className="list-inline-item">
          <WhatsappShareButton url={props.url}>
            <WhatsappIcon size={iconSize} round />
          </WhatsappShareButton>
        </li>
      </ul>
    </Collapse>
  );
}

export default ShareLinks;
