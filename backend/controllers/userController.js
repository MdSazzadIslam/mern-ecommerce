"use strict";

require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userService = require("../services/userService");
const sendEmail = require("../utils/sendMail");
const generateToken = require("../middlewares/generateToken");
const activationToken = require("../middlewares/activationToken");

exports.getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    return res.status(500).send({ auth: false, msg: "Server error" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        active: user.active,
        role: user.role,
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({
        success: false,
        msg: "Please enter email and password.",
      });
    } else {
      try {
        const user = await userService.checUserExist(req.body);
        if (user === undefined || user === null) {
          return res
            .status(401)
            .send({ success: false, msg: "User not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (passwordIsValid === false)
          return res.json({
            success: false,
            msg: "Password is invalid!!!",
          });
        if (!passwordIsValid)
          return res.status(401).send({
            msg: "Password is not valid.",
            success: false,
            token: null,
          });

        //creating a token
        var token = await generateToken(user._id);
        if (user) {
          res.json({
            success: true,
            msg: "Successfull",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            active: user.active,
            role: user.role,
            token: token,
          });

          //res.cookie("token", token, { maxAge: 900000, httpOnly: true });
        } else {
          return res
            .status(401)
            .send({ success: false, msg: "Please check all the data" });
        }
      } catch (error) {
        return res.status(500).json({ success: false, msg: err.message });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.registration = async (req, res, next) => {
  debugger;

  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res
        .status(401)
        .send({ success: false, msg: "Please fillup required field." });
    } else if (password.length < 8) {
      return res.status(401).send({
        success: false,
        msg: "Password must be at least 6 characters.",
      });
    } else {
      const userExists = await userService.checkEmailExist(email);
      if (userExists) {
        return res
          .status(400)
          .send({ success: false, msg: "Email already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        firstName,
        lastName,
        email,
        password: passwordHash,
      };

      const token = await activationToken(newUser);

      //const code = createActivationCode();

      const url = `${process.env.CLIENT_URL}auth/activation/${token}`;

      try {
        await sendEmail(
          email,
          newUser.firstName,
          newUser.lastName,
          url,
          "Verify your email address"
        );
        const user = await userService.registration(newUser);

        if (user) {
          /*          res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            active: true,
          });
 */
          res.status(200).send({
            success: true,
            msg: "Register Success! Please check you email.",
          });
        } else {
          return res
            .status(500)
            .send({ success: false, msg: "Something went wrong" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(401)
          .send({ success: false, msg: "Email could not be sent." });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, msg: err.message });
  }
};
exports.activateUser = async (req, res, next) => {
  try {
    const token = req.params.token;

    const user = await jwt.verify(token, process.env.JWT_SECRECT_KEY);

    if (!user) {
      return res.json({ msg: "Token expired!!!" });
    }
    console.log(user);
    const { firstName, lastName, email, password } = user;

    const checkEmailExists = await userService.checkEmailExist(email);

    if (checkEmailExists != null || checkEmailExists != undefined) {
      const checkActiveUser = await userService.checkActiveStatus(email);

      if (checkActiveUser != null) {
        const user = {
          id: checkActiveUser.id,
          firstName: checkActiveUser.firstName,
          lastName: checkActiveUser.lastName,
          password: checkActiveUser.password,
          activeStatus: true,
        };

        /*     checkActiveUser.firstName =
          checkEmailExists.firstName || checkActiveUser.firstName;
        checkActiveUser.lastName =
          checkEmailExists.lastName || checkActiveUser.lastName;
        checkActiveUser.email = checkEmailExists.email || checkActiveUser.email;
        checkActiveUser.password =
          checkEmailExists.password || checkActiveUser.password;
        checkActiveUser.activeStatus = true; */

        const newUser = await userService.updateUser(checkActiveUser.id, user);

        return res.status(201).json({ msg: "Account activated successfully" });
      } else {
        return res.status(400).json({ msg: "Account already activeated." });
      }
    } else {
      return res.status(400).json({ msg: "Email not exists." });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  const user = await userService.getById(req.params.id);
  if (user) {
    try {
      await userService.deleteUser(req.params.id);
      return res.status(200).send({ auth: false, msg: "Deleted" });
    } catch (error) {
      return res.status(404).send({ auth: false, msg: "User not found" });
    }
  } else {
    return res.status(404).send({ auth: false, msg: "User not found" });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    console.log(user);

    if (user) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.activeStatus = req.body.activeStatus;

      const newUser = await userService.updateUser(req.params.id, user);
      res.json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        activeStatus: user.activeStatus,
        role: user.role,
      });
    } else {
      return res.status(404).send({ auth: false, msg: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.logout = (req, res, next) => {
  try {
    cookie.remove("login");
  } catch (err) {
    next(err);
  }
};
