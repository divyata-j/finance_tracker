import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Login/index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigation = useNavigate()

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "home";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // alert("Wrong details");
      alert(error.response.data.message);
      console.error(error);
    }
  }

  return (
    <div className="login1">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="login">
        <form action="POST" className="lform">
          <h1>LoginPage</h1>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="in"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="in"
          />
          <input type="submit" className="button" onClick={submit} />
          <br />
          <br />
          <div className="social">
            <p>
              Don't have an account? &nbsp;
              <Link to="/signup" style={{ fontSize: "125%" }}>
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
