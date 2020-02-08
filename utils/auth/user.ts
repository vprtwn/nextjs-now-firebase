import { get, has } from "lodash";
// having trouble getting types from lodash/object

/**
 * Take the user object from Firebase (from either the Firebase admin SDK or
 * or the client-side Firebase JS SDK) and return a consistent AuthUser object.
 * @param {Object} firebaseUser - A decoded Firebase user token or JS SDK
 *   Firebase user object.
 * @return {Object|null} AuthUser - The user object.
 * @return {String} AuthUser.id - The user's ID
 * @return {String} AuthUser.email - The user's email
 * @return {Boolean} AuthUser.emailVerified - Whether the user has verified their email
 */
export const createAuthUser = (firebaseUser: firebase.User | null) => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }
  return {
    id: get(firebaseUser, "uid"),
    email: get(firebaseUser, "email"),
    emailVerified: has(firebaseUser, "emailVerified")
      ? get(firebaseUser, "emailVerified") // client SDK
      : get(firebaseUser, "email_verified"), // admin SDK
    displayName: has(firebaseUser, "displayName")
      ? get(firebaseUser, "displayName") // client SDK
      : get(firebaseUser, "display_name") // admin SDK
  };
};

/**
 * Create an object with an AuthUser object and AuthUserToken value.
 * @param {Object} firebaseUser - A decoded Firebase user token or JS SDK
 *   Firebase user object.
 * @param {String} firebaseToken - A Firebase auth token string.
 * @return {Object|null} AuthUserInfo - The auth user info object.
 * @return {String} AuthUserInfo.AuthUser - An AuthUser object (see
 *   `createAuthUser` above).
 * @return {String} AuthUser.token - The user's encoded Firebase token.
 */
export const createAuthUserInfo = ({ firebaseUser = null, token = null } = {}) => {
  return {
    AuthUser: createAuthUser(firebaseUser),
    token
  };
};
