import React, { useState } from "react";
import axios from "axios";
import "./PostCreate.styles.css";

function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://blog-posts-svc.com/posts/create", {
      title,
    });

    setTitle("");
  };
  return (
    <div className="post-container">
      <h1 className="post-heading text-light">New Post</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add some text"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="form-cta">SUBMIT</button>
      </form>
    </div>
  );
}

export default PostCreate;
