const jwt = require('jsonwebtoken');
function authtoken(req, res, next) {

    const authantication = req.headers.authorization;
    const token = authantication && authantication.split(' ')[1];
    if (token == null) {
        console.log(token, "asd")
        return res.status(401).json({ "message": "unauthorized" });
    }
    jwt.verify(token, "jsonweb12345", (err, data) => {

        if (err) {
            console.log(err)
            return res.status(401).json({ message: "unauthorized" })
        }
        req.user = data;
        console.log(data, "from jwt")
        next();
    })


}
function authorization(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ "message": "admin access only" })
        }
        next();
    }
}
module.exports = { authtoken, authorization }