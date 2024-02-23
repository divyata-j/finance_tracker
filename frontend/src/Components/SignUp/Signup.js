import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
//import { InnerLayout } from "../../styles/Layouts"
import "../Login/index.css";
function SignUp() {
  // const history = useNavigate()
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    console.log(username, email, password);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/user/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log(response);
      if (response.status == 200) {
        console.log("success");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      } else {
        alert(
          response.data.message == undefined
            ? response.data
            : response.data.message
        );
      }
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      }
    } catch (error) {
      // alert("An error occurred. Please try again.");
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form action="POST" align="center" className="lform">
        <h1>Signup</h1>
        <input
          className="in"
          type="text"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User Name"
        />
        <br />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="in"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="in"
          placeholder="Password"
        />

        <input type="submit" className="button" onClick={submit} />
        <br />

        <div className="social">
          <p>
            Already have an account?{" "}
            <Link to="/" style={{ fontSize: "125%" }}>
              Login{" "}
            </Link>
          </p>
        </div>
      </form>

      {/* </InnerLayout> */}
    </div>
  );
}

export default SignUp;
