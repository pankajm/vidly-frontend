import React from "react";

const MoviesForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movies Form {match.params._id}</h1>
      <button
        onClick={() => history.push("/movies")}
        className="btn btn-primary btn-sm"
      >
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
