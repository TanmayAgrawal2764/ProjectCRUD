const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({
            msg: "Token does not exist/ expire"
        });
    }

    try {
        await jwt.verify(token, process.env.jwt_secret_token, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    msg: "token not valid"
                });
            } else {
                req.user = decoded.user;
                next();
            }
        });

    } catch (error) {
        console.log("something went wrong" + error);
        res.status(500).json({
            msg: "Server error"
        });
    }
}
