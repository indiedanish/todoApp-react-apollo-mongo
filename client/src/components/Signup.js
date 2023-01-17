import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqloperations/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <h1>Loading</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser({
        variables: {
          userNew: formData,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container my-container">
      <div
        className="form-container"
        style={{ display: "flex", width: "100%", flexDirection: "column" }}
      >
        {error && <div className="red card-panel">{error.message}</div>}

        {data && data.user && (
          <div className="green card-panel">
            {data.user.firstName} is SignedUp. You can login now!
          </div>
        )}
        <h5>Signup</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <Link className="have-account" to="/login">
            <p>Already have an account ?</p>
          </Link>
          <button className="btn #7f0f03 " type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
