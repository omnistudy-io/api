require('dotenv').config();

export default async function auth(req, res, next) {
    const authHeader = req.headers[process.env.AUTH_HEADER];
    console.log("Auth Header: " + authHeader);
    if(authHeader === undefined || authHeader === '') {
        return next(new Error("No authentication header provided"));
    }
    else {
        next();
    }
}