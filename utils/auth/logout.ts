/* globals window */
import firebase from "firebase/app";
import "firebase/auth";

export default async () => {
  try {
    await firebase.auth().signOut();
    // Sign-out successful.
    if (typeof window !== "undefined") {
      // Remove the server-side rendered user data element. See:
      // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
      const elem = window.document.getElementById("__MY_AUTH_USER_INFO");
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
