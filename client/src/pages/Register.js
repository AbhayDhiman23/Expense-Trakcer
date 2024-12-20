import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Registration successful");
      navigate("/login");  // Redirect to login page after successful registration
    } catch (error) {
      setLoading(false);
      // Extracting more specific error message from the response if available
      const errorMessage = error.response ? error.response.data.message : "Something went wrong";
      message.error(errorMessage);
      console.error("Registration error:", error);  // Log the error details for debugging
    }
  };

  useEffect(() => {
    if (localStorage.getItem("expense-tracker-user")) {
      navigate("/");
    }
  }, [navigate]);

  const validateName = (_, value) => {
    return value && value.length >= 4
      ? Promise.resolve()
      : Promise.reject(new Error("Name needs a minimum of 4 characters"));
  };

  const validatePassword = (_, value) => {
    const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return validationRegex.test(value)
      ? Promise.resolve()
      : Promise.reject(
          new Error(
            "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character"
          )
        );
  };

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
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
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>REGISTER</h1>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  message: "Name should have a minimum of 4 characters!",
                  validator: validateName,
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: "Email should be valid!",
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  message:
                    "Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character",
                  validator: validatePassword,
                  required: true,
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login" className="linkTo">
                Already Registered? Click Here To Login
              </Link>
              <button className="btn btn-outline-light" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
