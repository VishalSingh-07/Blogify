import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import "../assests/styles/Post.css";

export default function Post({ _id, title, summary, content, cover, createdAt, author }) {
  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };
  return (
    <div className="post-container">
      <div className="post-image-container">
        <Link to={`/post/${_id}`} className="post-image-link">
          <img className="post-image" src={cover} alt="ImagePost" />
        </Link>
      </div>
      <div className="post-content-container">
        <Link to={`/post/${_id}`} className="post-title-link ">
          <h2 className="post-title">{title}</h2>
        </Link>
        <p className="post-info">
          <div className="post-author">Author: {author.username}</div>
          <time className="post-time">
            <i class="fa-solid fa-clock"></i>
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="post-summary">{truncate(summary,450)}</p>
      </div>
    </div>
  );
}
