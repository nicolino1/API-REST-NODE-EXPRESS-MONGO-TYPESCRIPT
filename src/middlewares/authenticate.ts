import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: any, next: any): any => {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(401).send('Access Denied')
        }
        else {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
            console.log(verified)
            req.user = verified;
            next();
        }


        return req.user;
    } catch (err: any) {
        console.log(err.message);
        return res.status(400).send('Invalid Token');
    }
}