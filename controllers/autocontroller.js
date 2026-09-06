const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   GENERATE TOKEN
========================= */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


/* =========================
   SIGNUP
========================= */

const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;


    // Name validation
if (!name || name.trim().length < 2) {
  return res.status(400).json({
    message: "Name must be at least 2 characters",
  });
}

// Email validation
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!email || !emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid email address",
  });
}

// Password validation
if (!password || password.length < 6) {
  return res.status(400).json({
    message: "Password must be at least 6 characters",
  });
}

const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Developer",
    });

    res.status(201).json({
      message:
        "User registered successfully",

      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


/* =========================
   LOGIN
========================= */

const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",

      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


/* =========================
   UPDATE PROFILE
========================= */

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email, role } = req.body;

    // 1. Name validation
    if (
      name !== undefined &&
      (!name.trim() || name.trim().length < 2)
    ) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    // 2. Email validation
    if (email !== undefined) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Please enter a valid email address",
        });
      }
    }

    // 3. Duplicate email validation
    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        email: email,
      });

      if (emailExists) {
        return res.status(409).json({
          message: "Email already in use",
        });
      }
    }

    // Update profile
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

  } catch (error) {
    next(error);
  }
};

/* =========================
   EXPORTS
========================= */

module.exports = {
  signup,
  login,
  updateProfile,
};