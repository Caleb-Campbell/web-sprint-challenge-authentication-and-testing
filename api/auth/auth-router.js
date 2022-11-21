const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  checkCredentials,
  uniqueUsername,
  usernameExists,
} = require("./authMiddleware");
const Users = require("../user/user-model");
const { tokenBuilder } = require("./authHelper");
// helpers
router.post(
  "/register",
  checkCredentials,
  uniqueUsername,
  async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    try {
      const newUser = await Users.add(user);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  checkCredentials,
  usernameExists,
  (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.userFromDb.password)) {
      const token = tokenBuilder(req.userFromDb);

      res.status(200).json({ message: `welcome, ${req.body.username}`, token });
    } else {
      next({ status: 401, message: "invalid credentials" });
    }
  }
);

module.exports = router;