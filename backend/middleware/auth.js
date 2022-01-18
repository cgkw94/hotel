module.exports = (req, res, next) => {
  if (req.session.auth) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "Session timeout, please refresh the page and login" });
  }
};
