const JWT = require("jsonwebtoken");
const User = require("../models/usersmodel");


function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
module.exports = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        // const token = req.header("Authorization");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGExNDJiNDM2ZTMzOTU3OGM2OWUzNzIiLCJlbWFpbCI6ImxpZG9ybWFsaWNoQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiLXnNeZ15PXldeoIiwiaWF0IjoxNjkwMjcxNzQ2fQ.SfWSM4XaH8TLD3dP2V8Eb3ovXgnVdQZHuBktKitgn08";
        if (!token) return res.status(401).send("Access Denied. No valid Token");
        // check the Token with the verify
        const payload = JWT.verify(token, process.env.JWT_Key);

        let user = parseJwt(token);
        user = await User.findOne({ email: user.email });
        const userName = `${user.first_name} ${user.last_name}`;
        // save the payload in the request object
        req.payload = payload;
        req.userName = userName;
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid Token");
    }
}