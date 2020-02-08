import "../css/main.css";
import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Link from "next/link";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import Header from "../components/header";
import Footer from "../components/footer";

const Index = (props: any) => {
  const { AuthUserInfo } = props;
  const authUser = get(AuthUserInfo, "AuthUser");

  return (
    <>
      <Header />
      {!authUser ? (
        <>
          <div>not signed in.</div>
          <div>
            <Link href={"/login"}>
              <a>[ log in ]</a>
            </Link>
          </div>
          <p>
            <Link href={"/signup"}>
              <a>[ create account ]</a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <pre className="text-xs">{JSON.stringify(authUser, null, 2)}</pre>
          <p>
            <Link href={"/account"}>
              <a>[ account ]</a>
            </Link>
          </p>
          <p>
            <Link href={"/spaces"}>
              <a>[ spaces ]</a>
            </Link>
          </p>
        </>
      )}
      <>
        <Footer />
      </>
    </>
  );
};

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  })
};

Index.defaultProps = {
  AuthUserInfo: null
};

export default withAuthUser(withAuthUserInfo(Index));
