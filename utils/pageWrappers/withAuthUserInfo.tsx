/* eslint react/jsx-props-no-spreading: 0 */
import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { AuthUserInfoContext } from "../auth/hooks";
import { NextPageContext } from "next";

// Provides an AuthUserInfo prop to the composed component.
export default (ComposedComponent: any) => {
  const WithAuthUserInfoComp = (props: any) => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props;
    return (
      <AuthUserInfoContext.Consumer>
        {AuthUserInfo => (
          <ComposedComponent
            {...otherProps}
            AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession}
          />
        )}
      </AuthUserInfoContext.Consumer>
    );
  };

  WithAuthUserInfoComp.getInitialProps = async (ctx: NextPageContext) => {
    const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      AuthUserInfo
    };
  };

  WithAuthUserInfoComp.displayName = `WithAuthUserInfo(${ComposedComponent.displayName})`;

  WithAuthUserInfoComp.propTypes = {
    AuthUserInfo: PropTypes.shape({
      AuthUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        emailVerified: PropTypes.bool.isRequired
      }),
      token: PropTypes.string
    })
  };

  WithAuthUserInfoComp.defaultProps = {};

  return WithAuthUserInfoComp;
};
