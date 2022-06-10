const responses = require("../../helper/responses");
const service = require("../service");
const transformer = require("../../../transformers");
const authService = require("../../middleware/services/auth");
const models = require("../../../models");

const signup = async (req, res) => {
  try {
    const { username, email, password, password_confirmation } = req?.body;
    if (!username || !email || !password)
      return responses.failedWithMessage("Fill all required fields.", res);
    if (username?.length < 3)
      return responses.failedWithMessage("username is invalid", res);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body?.email))
      return responses.failedWithMessage("Please add a valid email", res);
    if (password?.length < 6)
      return responses.failedWithMessage("Please add a valid password", res);
    if (password != password_confirmation)
      return responses.failedWithMessage(
        "Your password and password confirmation do not match",
        res
      );
    const user = await service.createUser({
      username,
      email,
      password,
    });
    if (user) {
      return responses.successWithMessage("User created successfully", res);
    }
    return responses.failedWithMessage("User already exists.", res);
  } catch (err) {
    console.log(err);
    responses.serverError(res);
    return;
  }
};

const signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req?.body;
    if (!usernameOrEmail || !password)
      return responses.failedWithMessage("ckeck form eamil or password", res);
    const result = await service.signin({ usernameOrEmail, password });
    if (result) {
      return responses.success(
        "successfully logged in",
        { user: transformer.userTransformer(result.user), token: result.token },
        res
      );
    }
    return responses.unauthenticated(res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const updateUser = async (req, res) => {
  //   try {
  //     const currentUser = req?.user;
  //     let newValue;
  //     let fieldName;
  //     const {username, email } = req?.body
  //     if (!username) username = currentUser.username
  //     if (!email) username = currentUser.email
  //     const currentUser = models.users.findOne()
  //     let newUser = await service.updateUser(currentUser, {username, email});
  //     console.log(newUser);
  //     if (newUser) return responses.successWithMessage("You can edit!", res);
  //     else return responses.failedWithMessage("Could not edit", res)
  //   } catch (err) {
  //       console.log(err)
  //     return responses.serverError(res);
  //   }
};

const updatePassword = async (req, res) => {
  try {
    const currUser = await models.users.findByPk(req?.user?.id);
    if (!currUser) return responses.unauthenticated(res);
    const { currPassword, newPassword, newPasswordConfirmation } = req?.body;
    if (newPassword != newPasswordConfirmation)
      return responses.failedWithMessage("Passwords do not match.", res);
    if (!authService.comparePasswords(currPassword, currUser.password))
      return responses.failedWithMessage(
        "Password you entered is incorrect",
        res
      );
    if (authService.comparePasswords(newPassword, currUser.password))
      return responses.failedWithMessage(
        "Your new password cannot be the same as your old password",
        res
      );
    const result = await service.updatePassword(currUser, newPassword);
    if (result)
      return responses.successWithMessage("Password changed successfully", res);
    return responses.failedWithMessage("Failed to changed password", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const logout = async (req, res) => {
  
};


const getUserInfo = async (req, res) => {
  
};

const updateProfile = async (req, res) => {
  
};

const deleteUser = async (req, res) => {
  
};

module.exports = {
  signup,
  signin,
  updateUser,
  updatePassword,
  logout,
  getUserInfo,
  updateProfile,
  deleteUser
};
