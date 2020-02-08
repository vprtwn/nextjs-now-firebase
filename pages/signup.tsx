import "../css/main.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import initFirebase from "../utils/auth/initFirebase";
import Footer from "../components/footer";

initFirebase();

type Inputs = {
  email: string;
  password: string;
  displayName: string;
};

function Signup() {
  const initialValues: Inputs = {
    email: "",
    password: "",
    displayName: ""
  };
  var firstInput: HTMLInputElement | null = null;

  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password);
      var user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: inputs.displayName
        });
      }
      Router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    firstInput?.focus();
  }, []); // [] = run once

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            ref={r => (firstInput = r)}
          />
        </p>
        <p>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
        </p>
        <p>
          <label htmlFor="displayName">display name: </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            onChange={handleInputChange}
            value={inputs.displayName}
          />
        </p>
        <p>
          <button type="submit">[ create account ]</button>
        </p>
      </form>
      <p>
        {"or "}
        <Link href="/login">
          <a>[ log in ]</a>
        </Link>
      </p>
      <Footer />
    </>
  );
}

export default Signup;
