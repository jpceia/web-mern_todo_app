
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // fail unauthorized
  res.status(401).send("You must log in to continue");
}

export default isAuthenticated;
