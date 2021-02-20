import React from "react";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";
import JWT from "jsonwebtoken";

export default function Navbar() {
  const history = useHistory();

  async function handleSignOut() {
    console.log("logout message");
    try {
      await Auth.signOut();
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("IDToken");
      history.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const IDToken = localStorage.getItem("IDToken");
  const decodeID = JWT.decode(IDToken);
  console.log(decodeID);

  const AccessToken = localStorage.getItem("AccessToken");
  const decodeAccess = JWT.decode(AccessToken);
  console.log(decodeAccess);

  const RefreshToken = localStorage.getItem("RefreshToken");
  const decodeRefresh = JWT.decode(RefreshToken);
  console.log(decodeRefresh);
  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <Link to="/" className="navbar-brand" style={{ display: "flex" }}>
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_tmyg7clb.json"
            background="transparent"
            speed={1}
            style={{ width: "40px", height: "40px" }}
            loop
            autoplay
          ></lottie-player>{" "}
          <span style={{ marginTop: "5px", marginLeft: "5px" }}>AuthDemo</span>
        </Link>
        {history?.location?.pathname === "/dashboard" &&
        decodeAccess &&
        decodeID ? (
          <form className="form-inline">
            <p>{decodeID?.name}</p>
            <Link to="/">
              <button
                type="submit"
                onClick={handleSignOut}
                className="btn btn-outline-success"
              >
                SignOut
              </button>
            </Link>
          </form>
        ) : (
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
        )}
      </nav>
    </>
  );
}
