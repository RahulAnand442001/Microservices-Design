import React, { useState } from "react";
import axios from "axios";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const handleContentSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://blog-posts-svc.com/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div>
      <form className="form-group" onSubmit={handleContentSubmit}>
        <input
          type="text"
          placeholder="write a comment"
          className="form-control"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button className="form-cta">SUBMIT</button>
      </form>
    </div>
  );
}

export default CommentCreate;
