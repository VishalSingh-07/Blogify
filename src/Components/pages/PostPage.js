import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import DeletePost from "./DeletePostPage";
import Loader from "../Loader";
import "../assests/styles/PostPage.css";
function PostPage() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  useEffect(() => {
    fetch(`${url}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        setIsLoading(false);
      });
    });
  }, [id, url]);
  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  if (!postInfo) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <div className="post_page">
      <div className="post_image">
        <img src={postInfo.cover} alt="PostImage" />
      </div>
      <h1>{postInfo.title}</h1>
      <time>
        <i class="fa-solid fa-clock"></i>
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="author">Author: {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link
            to={`/edit/${postInfo._id}`}
            className="Link edit-button"
            onClick={() => setIsLoading(true)}>
            <button className="button">
              <span className="text">
                <i className="fa-solid fa-square-plus fa-lg"></i>Edit this Post
              </span>
            </button>
          </Link>
        </div>
      )}

      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} ></div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <button className="button" onClick={() => setShowModal(true)}>
            <span className="text">
              <i class="fa-solid fa-trash fa-sm"></i>Delete this Post
            </span>
          </button>
        </div>
      )}
      {showModal ? <DeletePost closeModal={closeModal} /> : null}
    </div>
  );
}

export default PostPage;
