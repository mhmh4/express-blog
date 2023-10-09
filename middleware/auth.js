import dotnev from "dotenv/config";
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

export { authenticateToken };
