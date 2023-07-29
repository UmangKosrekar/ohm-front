import React from "react";
import "../App.css";

const Card = ({
  id,
  title,
  field1,
  field2,
  stateFlag,
  key1,
  key2,
  clickProp,
}) => {
  return (
    <div className="card" id={id} onClick={clickProp}>
      <div className="left-section">
        <div className="card-title">{title}</div>
        <div className="card-fields">
          <div className="card-field">
            {key1}: {field1}
          </div>
          <div className="card-field">
            {key2}: {field2}
          </div>
        </div>
      </div>
      <div className="flag-container">
        <div className="flag-text">{stateFlag}</div>
      </div>
    </div>
  );
};

export default Card;
