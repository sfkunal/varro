import React from "react";
import Home from "./Home";
import { CssBaseline } from "@mui/material";
import ModalIcons from "./ModalIcons";
import { ReactComponent as Logo } from "./varro.svg";

function App() {

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom left, #F3F2FF, #B1B9FF)",
      }}
    >
      <CssBaseline />
      <ModalIcons />
      <Logo
        style={{
          width: "70px",
          height: "70px",
          position: "fixed",
          left: 10,
          top: 10,
          padding: "10px",
          zIndex: 999
        }}
      />
      <Home />
    </div>
  );
}

export default App;
