import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INews } from "../../interfaces";
import NewsPost from "./NewsPost";
import axios from "axios";

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState<INews>();

  useEffect(() => getNewsPost(), []);

  function getNewsPost() {
    axios.get(`/news/${id}`).then((response) => setPost(response.data));
  }

  return <div>{post && <NewsPost content={post} />}</div>;
}

export default ViewPost;
