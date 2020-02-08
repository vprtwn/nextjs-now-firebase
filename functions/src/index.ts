import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

let serviceAccount: any;
let storageBucket: string = "";
const environment = functions.config().app.environment;
if (environment === "staging") {
  serviceAccount = require("../serviceAccount-staging.json");
  storageBucket = "emails-show-8eb6f.appspot.com";
} else if (environment === "production") {
  serviceAccount = require("../serviceAccount-production.json");
  storageBucket = "emails-show-prod.appspot.com";
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket
});

export const getEnvironment = functions.https.onCall(async (data, context) => {
  return { environment: environment };
});
