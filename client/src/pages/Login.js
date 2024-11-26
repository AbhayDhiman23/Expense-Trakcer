import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);

      // Store user info (consider only storing necessary non-sensitive info like token)
      localStorage.setItem(
        "expense-tracker-user",
        JSON.stringify({ ...response.data, password: "" })
      );

      setLoading(false);
      message.success("Login successful");
      navigate("/");  // Redirect to home page after successful login
    } catch (error) {
      setLoading(false);
      
      // Display specific error message from the backend if available
      const errorMessage = error.response ? error.response.data.message : "Login failed";
      message.error(errorMessage);
      console.error("Login error:", error);  // Log full error details for debugging
    }
  };

  useEffect(() => {
    // If the user is already logged in, redirect them to the homepage
    if (localStorage.getItem("expense-tracker-user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>LOGIN</h1>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ message: "Please enter your email!", required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ message: "Please enter your password!", required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register" className="linkTo">
                Not Registered Yet? Click Here To Register
              </Link>
              <button className="btn btn-outline-light" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
