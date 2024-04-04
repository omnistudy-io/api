function auth(req, res, next) {
    // const token = req.headers.authorization || req.headers.Authorization;

    // if(token === undefined || token !== "Bearer 123") {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    // console.log('Authenticating...');
    next();
}

module.exports = auth;