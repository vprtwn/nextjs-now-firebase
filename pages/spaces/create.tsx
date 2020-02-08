import "../../css/main.css";
import React, { useState, useEffect, ChangeEvent } from "react";
import firebase from "firebase/app";
import PropTypes from "prop-types";
import { get } from "lodash";
import Link from "next/link";
import Router from "next/router";
import withAuthUser from "../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../utils/pageWrappers/withAuthUserInfo";
import initFirebase from "../../utils/auth/initFirebase";
import Header from "../../components/header";
import Footer from "../../components/footer";

initFirebase();

type Inputs = {
  spaceId: string;
  title: string;
};

const SpacesCreate = (props: any) => {
  const { AuthUserInfo } = props;
  const authUser = get(AuthUserInfo, "AuthUser");
  var firstInput: HTMLInputElement | null = null;

  const initial: Inputs = {
    spaceId: "",
    title: ""
  };

  const [inputs, setInputs] = useState(initial);

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      if (inputs.spaceId.length === 0) {
        throw `space ID can't be empty`;
      } else if (inputs.title.length === 0) {
        throw `title can't be empty`;
      }
      const match = inputs.spaceId.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      if (!match || match.length > 1) {
        throw `space ID can only contain letters, numbers and hyphens`;
      }
      const db = firebase.firestore();
      const ref = db.collection("spaces").doc(inputs.spaceId);
      const snap = await ref.get();
      if (snap.exists) {
        throw `a space with that ID already exists`;
      }
      await ref.set({
        spaceId: inputs.spaceId,
        title: inputs.title,
        uid: authUser.id
      });
      Router.push("/spaces");
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
    if (!authUser) {
      Router.push("/");
    } else {
      firstInput?.focus();
    }
  }, []); // [] = run once

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <div>
          <Header />
          <div>create a new space</div>
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="spaceId">space ID: </label>
              <input
                type="text"
                id="spaceId"
                name="spaceId"
                onChange={handleInputChange}
                value={inputs.spaceId}
                ref={r => (firstInput = r)}
              />
            </p>
            <p>
              <label htmlFor="title">title: </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleInputChange}
                value={inputs.title}
              />
            </p>
            <p>
              <button type="submit">[ create ]</button>
            </p>
          </form>
          <p>
            <Link href={"/spaces"}>
              <a>[ back to spaces ]</a>
            </Link>
          </p>
          <Footer />
        </div>
      )}
    </>
  );
};

SpacesCreate.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  })
};

SpacesCreate.defaultProps = {
  AuthUserInfo: null
};

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(SpacesCreate));
