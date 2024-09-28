import React from "react";
import SecondsCounter from "./././secondsCounter.jsx";
import Navbar from "./navbar.jsx";

//create your first component
const Home = () => {
  return (
    <div className="oxanium-global">
      <Navbar />
      <div style={{ marginTop: "10%" }}>
        <SecondsCounter />
      </div>
    </div>
  );
};

export default Home;
