import React from "react";

function CommentList({ comments }) {
  const renderComments = comments.map((comment) => {
    let content;
    let status = comment.status;

    switch (status) {
      case "approved":
        content = comment.content;
        break;
      case "pending":
        content = "Loading Comment ...";
        break;
      case "rejected":
        content = "Can't Load Comment ! Rejected";
        break;
      default:
        content = "404 !";
        break;
    }

    return (
      <li
        className={
          status === "rejected"
            ? `list-group-item text-danger`
            : status === "pending"
            ? `list-group-item text-success`
            : `list-group-item`
        }
        key={comment.id}
      >
        {content}
      </li>
    );
  });

  return (
    <>
      <span className="text-primary">{comments.length} comments</span>
      <ul className="list-group list-group-flush">{renderComments}</ul>
    </>
  );
}

export default CommentList;
