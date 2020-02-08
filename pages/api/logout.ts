import commonMiddleware from "../../utils/middleware/commonMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

// req type: CookieSession?
const handler = (req: any, res: NextApiResponse) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  req.session = null;
  res.status(200).json({ status: true });
};

export default commonMiddleware(handler);
