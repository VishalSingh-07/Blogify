import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, AlertTitle } from "@mui/material";

function CreatePost() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();
    if (title.length === 0 || summary.length === 0 || content.length === 0 || files.length == 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
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
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      {error ? (
        <Alert severity="error">
          <AlertTitle>Oops, Something wasn't right</AlertTitle>
          Please fill out — <strong>all required fields!</strong>
        </Alert>
      ) : null}
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}></input>
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}></input>
        <input type="file" onChange={(ev) => setFiles(ev.target.files)}></input>
        <Editor onChange={setContent} value={content} />
        <button className="button_primary" style={{ marginTop: "15px" }}>
          Create Post
        </button>
      </form>
    </>
  );
}

export default CreatePost;
