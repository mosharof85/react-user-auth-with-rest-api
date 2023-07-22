import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "50px",
          height: "50px",
          display: "block",
          color: "#000000",
        }}
      ></Spinner>
    </div>
  );
}

export default Loader;
