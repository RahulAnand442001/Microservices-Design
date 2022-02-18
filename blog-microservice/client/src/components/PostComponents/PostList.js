import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "../CommentsComponent/CommentCreate";
import CommentList from "../CommentsComponent/CommentList";
import "./PostList.style.css";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://blog-posts-svc.com/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card post-card p-4" key={post.id}>
        <h3 className="card-title">{post.title}</h3>
        <div className="card-body">
          <CommentCreate postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });
  return <div className="container posts-container">{renderedPosts}</div>;
};

export default PostList;
