import "../css/main.css";
import React, { useState, useEffect, ChangeEvent } from "react";
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
};

function Login() {
  const initial: Inputs = {
    email: "",
    password: ""
  };
  var firstInput: HTMLInputElement | null = null;

  const [inputs, setInputs] = useState(initial);

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password);
      Router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<any>) => {
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
          <button type="submit">[ log in ]</button>
        </p>
      </form>
      <p>
        {"or "}
        <Link href="/signup">
          <a>[ create account ]</a>
        </Link>
      </p>
      <Footer />
    </>
  );
}

export default Login;
