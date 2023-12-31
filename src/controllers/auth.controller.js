const userDatabaseService = require("../services/user.database.service");
const passwordService = require("../services/password.service");
const jwtService = require("../services/jwt.service");

// User login
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const userFound = await userDatabaseService.findUser({ email });
    if (!userFound) {
      return res.status(401).json({
        success: false,
        message: "User cannot find",
      });
    }
    const isValid = await passwordService.passwordCompare(
      req.body.password,
      userFound.password,
    );
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await jwtService.getToken(userFound);
    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: err,
    });
  }
};

// Register users
exports.signupUser = async (req, res) => {
  try {
    const hash = await passwordService.passwordHash(req.body.password);
    if (!hash) {
      return res.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
        data: err,
      });
    }
    const userCreated = await userDatabaseService.createNewUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      address: req.body.address,
      contact: req.body.contact,
    });
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: userCreated,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "USER ALREADY EXISTS",
        data: err,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
        data: err,
      });
    }
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const emailFound = await userDatabaseService.findUser({ email });

    if (!emailFound) {
      return res.status(409).json({
        success: false,
        message: "Email cannot find",
      });
    }
    res.status(200).json({
      success: true,
      message: "Your email found",
      data: email,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
