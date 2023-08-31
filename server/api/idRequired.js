const requireUser  = (req, res, next) =>{
    //if user is logged in pass them through
    console.log(`this is require user`, req.userId)
    if(req.userId){
      next();
    }
    else{
      res.status(401).send({message: "User unauthorized"});
    }
  }

  const requireAdmin = (req, res, next) => {
    if (req.admin) {
      next();
    }else {
      res.status(401).send({message: "User unauthorized"})
    }
  }

  const requireUserOrAdmin = (req, res, next) => {
    if (req.userId === Number(req.param.id) || req.admin) {
      next();
    } else {
      res.status(401).send({ message: "User unauthorized" });
    }
  };
  
  module.exports = {
    requireUser,
    requireAdmin,
    requireUserOrAdmin
  }