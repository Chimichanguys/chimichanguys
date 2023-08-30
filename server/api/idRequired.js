const requireLogin = (req, res, next) => {
  //if user is logged in pass them through
  if (req.userId) {
    next();
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

//TODO
const requireAdmin = () => {};

//TODO
const requireUserOrAdmin = (req, res, next) => {
  if (req.userId === Number(req.param.id) || req.admin) {
    next();
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

module.exports = {
  requireUser: requireLogin,
  requireUserOrAdmin,
};
