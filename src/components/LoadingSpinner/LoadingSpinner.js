import React from "react";
import "./spinner.scss";

export default function LoadingSpinner({small}) {
  return (
    <div className="spinner-container">
      <div className={`loading-spinner ${small ? "small" : ""}`}>
      </div>
    </div>
  );
}