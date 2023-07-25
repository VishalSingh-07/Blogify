import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assests/styles/DeletePostPage.css";
import Loader from "../Loader";
const DeletePostPage = ({ closeModal }) => {
  const url = `${process.env.REACT_APP_API_URL}`;
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo));
    setIsLoading(false);
  }, [url, id]);

  async function deletePost() {
    const response = await fetch(`${url}/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      toast.success("Successfully!! Deleted your Blog");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
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
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h1>Delete Post</h1>
        <h2>Are you sure you want to delete this post?</h2>
        <h3>
          Title : <p>{postInfo.title}</p>
        </h3>
        <h3>
          Summary : <p>{postInfo.summary}</p>
        </h3>
        <div className="button-div">
          <button className="button" onClick={deletePost}>
            <span className="text">Yes</span>
          </button>
          <button className="button" onClick={closeModal}>
            <span className="text">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostPage;
