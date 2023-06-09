import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DeletePost.css";
const DeletePage = ({ closeModal }) => {
  const url = `${process.env.REACT_APP_API_URL}`;
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${url}/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo));
  }, []);

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

  if (!postInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Delete Post</h2>
        <p>Are you sure you want to delete this post?</p>
        <h2>{postInfo.title}</h2>
        <p>{postInfo.summary}</p>
        <button className="button_delete" onClick={deletePost}>
          Yes
        </button>
        <button className="button_delete" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePage;
