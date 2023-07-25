import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor/Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(`${url}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [url, id]);
  async function updatePost(ev) {
    ev.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(`${url}/post/`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Successfully!! Updated your Blog");
      setRedirect(true);
    } else {
      const errorResponse = await response.json();
      toast.error(errorResponse || "Oops, Unable to update your Blog");
      toast.info("Please try again later");
    }
    setIsLoading(false);
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <>
      <form onSubmit={updatePost}>
        <div className="input-block">
          <label htmlFor="Title" className="input-label">
            Title
          </label>
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            required
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="Summary" className="input-label">
            Summary
          </label>
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            required
            onChange={(ev) => setSummary(ev.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="Image" className="input-label">
            Image
          </label>
          <input type="file" required onChange={(ev) => setFiles(ev.target.files)} />
        </div>
        <div className="input-block">
          <label htmlFor="Image" className="input-label">
            Content
          </label>
          <Editor onChange={setContent} required value={content} />
        </div>

        <div className="modal-buttons">
          <button className="button" type="submit">
            <span className="text">{isLoading ? "Updating Post....." : "Update Post"}</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePost;
