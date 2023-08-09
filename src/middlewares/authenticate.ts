import jwt from "jsonwebtoken";

/* Middleware function used to verify the auth-token that comes in
   the request header. If it's a valid token the request continues 
   to the next step, if not, and error message is returned.
*/
export const authenticate = (req: any, res: any, next: any): any => {
    // extracting auth token from request header
    const token = req.header('auth-token');
    try {
        // if token is empty
        if (!token) {
            // access denied message
            return res.status(401).send('Access Denied')
        }
        else {
            // token verification
            const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
            // setting token in the request if it is valid
            req.user = verified;
            // next step
            next();
        }
        return req.user;
    } catch (err: any) {
        console.log(err.message);
        // if token not valid, sends an invalid token message
        return res.status(400).send('Invalid Token');
    }
}