import React from "react";

export default function Header(props) {
  return (
    <div className="header">
      {props.text && <h4>{props.text}</h4>}
      {props.tag && (
        <div className="options">
          <h3>{props.tag}</h3>
          <i
            className="fa fa-download fa-lg"
            aria-hidden="true"
            onClick={props.download}
          />
        </div>
      )}
      {props.children}
    </div>
  );
}
