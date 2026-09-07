const express = require("express");

const {
  signup,
  login,
  updateProfile,
  deleteProfile,
} = require("../controllers/autocontroller");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

/* =========================
   SIGNUP
========================= */

router.post("/signup", signup);

/* =========================
   LOGIN
========================= */

router.post("/login", login);

/* =========================
   GET PROFILE
========================= */

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

/* =========================
   UPDATE PROFILE
========================= */

router.put("/profile", protect, updateProfile);

/* =========================
   DELETE PROFILE
========================= */

router.delete("/profile", protect, deleteProfile);

module.exports = router;