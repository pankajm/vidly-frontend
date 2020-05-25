import React from "react";

const Like = ({ onClick, like }) => {
  let classes = "fa fa-heart";
  if (!like) classes += "-o";
  return (
    <i style={{ cursor: "pointer" }} onClick={onClick} className={classes} />
  );
};

export default Like;
