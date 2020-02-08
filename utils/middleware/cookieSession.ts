import cookieSession from "cookie-session";
import { NextApiRequest, NextApiResponse } from "next";

export const addSession = (req: any, res: any) => {
  // An array is useful for rotating secrets without invalidating old sessions.
  // The first will be used to sign cookies, and the rest to validate them.
  // https://github.com/expressjs/cookie-session#keys
  // TODO: store these in an actual secret
  let secretCurrent = "secretNMIIEvgIB";
  let secretPrevious = "secretADANBgk";
  let sessionSecrets = [secretCurrent, secretPrevious];

  // Example:
  // https://github.com/billymoon/micro-cookie-session
  const includeSession = cookieSession({
    keys: sessionSecrets,
    // TODO: set other options, such as "secure", "sameSite", etc.
    // https://github.com/expressjs/cookie-session#cookie-options
    maxAge: 604800000, // week
    httpOnly: true,
    overwrite: true
  });
  includeSession(req, res, () => {});
};

export default (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
  try {
    addSession(req, res);
  } catch (e) {
    return res.status(500).json({ error: "Could not get user session." });
  }
  return handler(req, res);
};
