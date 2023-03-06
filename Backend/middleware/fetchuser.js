var jwt = require('jsonwebtoken');
const JWT_SC = "Deepakisagoodboy";



const fetchuser = (req, res, next) => {
    // fetch the user from JWT id and add id to res
    const token = req.header ('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please aaaaaaa authenticate using a valid tocken" })
    }
    try {
        const data = jwt.verify(token, JWT_SC);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please  hhhhhhhhhhhhauthenticate using a valid tocken" })
    }
}


    module.exports = fetchuser;