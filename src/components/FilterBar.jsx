import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilterBar = ({ topic, lastTopic }) => {
  return (
    <div className="card">
      {location.pathname !== "/topic" ? (
        <Link to="../../topic">
          <div
            className="button internal-row narrow"
            role="button"
            tabIndex="0"
          >
            Topic: {topic || "all"}
          </div>
        </Link>
      ) : (
        <Link to={`../../${lastTopic ? `topic/${lastTopic}` : ""}`}>
          <div
            className="button internal-row narrow"
            role="button"
            tabIndex="0"
          >
            Back
          </div>
        </Link>
      )}
    </div>
  );
};

export default FilterBar;
