import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    const response = await fetch(`${url}/post/`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Congratulations! Your new blog has been successfully added");
      setRedirect(true);
    } else {
      const errorResponse = await response.json();
      toast.error(errorResponse || "Oops, Unable to add your new blog");
      toast.info("Please try again later");
    }
    setIsLoading(false);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form onSubmit={createNewPost} className="form-create">
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
            <span className="text">{isLoading ? "Creating Post....." : "Create Post"}</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePost;
