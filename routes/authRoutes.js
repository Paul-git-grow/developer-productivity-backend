const express = require("express");

const { signup, login, updateProfile } = require("../controllers/autocontroller");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

router.put("/profile", protect, updateProfile);

module.exports = router;