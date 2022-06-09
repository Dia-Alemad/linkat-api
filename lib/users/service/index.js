const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../../services/auth");

const createUser = async ({ username, email, password }) => {
  try {
    const [user, created] = await models.users.findOrCreate({
      where: {
        [Op.and]: [{ username }, { email }],
      },
      defaults: {
        username,
        email,
        password: authService.hashPassword(password),
      },
    });
    if (!created) return null;
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const signin = async ({ usernameOrEmail, password }) => {
  try {
    const user = await models.users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    if (user) {
      if (authService.comparePasswords(password, user.password))
        return { user: user, token: authService.signUser(user) };
      else return null;
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const updateUser = async (currentUser, fieldName, newValue) => {
  try {
    const newUser = models.users.update(
      {
        [fieldName]: newValue,
      },
      {
        where: {
          id: currentUser.id,
        },
      }
    );
    if (newUser) return newUser;
    else return false;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const updatePassword = async (currUser, newPassword) => {
  try {
    const result = await models.users.update(
      {
        password: authService.hashPassword(newPassword),
      },
      {
        where: {
          id: currUser.id,
        },
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

module.exports = {
  createUser,
  signin,
  updateUser,
  updatePassword,
};
