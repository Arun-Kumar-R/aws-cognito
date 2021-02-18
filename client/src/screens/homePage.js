import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";

const HomePage = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // async function handleSignOut() {
  //   try {
  //     await Auth.signOut();
  //     history.push("/signin");
  //   } catch (error) {
  //     console.log("error signing out: ", error);
  //   }
  // }

  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand" style={{ display: "flex" }}>
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_tmyg7clb.json"
            background="transparent"
            speed={1}
            style={{ width: "40px", height: "40px" }}
            loop
            autoplay
          ></lottie-player>{" "}
          <span style={{ marginTop: "5px", marginLeft: "5px" }}>AuthDemo</span>
        </a>
        <form className="form-inline">
          <Link to="/signup">
            <button type="submit" className="btn btn-outline-success">
              SignUp
            </button>
          </Link>
          <Link to="/signin">
            <button
              type="submit"
              className="btn btn-outline-success"
              style={{ marginLeft: "10px" }}
            >
              SignIn
            </button>
          </Link>
        </form>
      </nav>
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
