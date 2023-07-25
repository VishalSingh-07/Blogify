import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "../assests/styles/Editor.css";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github.css";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

function Editor({ value, onChange }) {
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <>
      <ReactQuill
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        theme={"snow"}
        placeholder="Type Content Here........"
      />
    </>
  );
}

export default Editor;
