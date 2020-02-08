import "../css/main.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { get } from "lodash";
import Link from "next/link";
import Router from "next/router";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import initFirebase from "../utils/auth/initFirebase";
import logout from "../utils/auth/logout";
import Header from "../components/header";
import Footer from "../components/footer";

initFirebase();

const Account = (props: any) => {
  const { AuthUserInfo, environment } = props;
  var authUser = get(AuthUserInfo, "AuthUser");

  useEffect(() => {
    if (!authUser) {
      Router.push("/");
    }
  });

  return (
    <>
      {!authUser ? (
        <></>
      ) : (
        <>
          <Header />
          <div>
            <label htmlFor="displayName">display name</label>{" "}
            <Link href="/account/update-name">
              <a>[ update ]</a>
            </Link>
            <p>{authUser.displayName}</p>
          </div>
          <p>{`env: ${environment}`}</p>
          <p>
            <button
              onClick={async () => {
                try {
                  await logout();
                  Router.push("/login");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              [ log out ]
            </button>
          </p>
          <Footer />
        </>
      )}
    </>
  );
};

Account.getInitialProps = async function() {
  const getEnvironment = firebase.functions().httpsCallable("getEnvironment");
  const result = await getEnvironment({});
  return {
    environment: result.data.environment
  };
};

export default withAuthUser(withAuthUserInfo(Account));
