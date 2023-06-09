import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, AlertTitle } from "@mui/material";
function EditPostPage() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`${url}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);
  async function updatePost(ev) {
    ev.preventDefault();
    if (title.length === 0 || summary.length === 0 || content.length === 0) {
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
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(`${url}/post`, {
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
  }
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <>
      {error ? (
        <Alert severity="error">
          <AlertTitle>Oops, Something wasn't right</AlertTitle>
          Please fill out — <strong>all required fields!</strong>
        </Alert>
      ) : null}
      <form onSubmit={updatePost}>
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
          Update Post
        </button>
      </form>
    </>
  );
}

export default EditPostPage;
