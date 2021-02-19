import React from "react";
import Navbar from "./navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="animation">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_bCtom0.json"
          background="transparent"
          speed={1}
          style={{ width: "400px", height: "400px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </>
  );
};

export default HomePage;
