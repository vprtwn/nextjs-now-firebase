import cookieSession from "./cookieSession";
import cookieSessionRefresh from "./cookieSessionRefresh";

// Load environment variables.
// require('../../env')

export default (handler: any) => cookieSession(cookieSessionRefresh(handler));
