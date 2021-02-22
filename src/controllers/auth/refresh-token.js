const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../../constants');
const { generateAccessToken } = require('../../utilities');

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const { uid } = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    if (!uid) {
      res.sendStatus(STATUS_CODE.UNAUTHORIZED);
      return;
    }

    const userExists = await User.exists({ uid });

    if (userExists) {
      const accessToken = generateAccessToken({ uid });

      res
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .sendStatus(STATUS_CODE.CREATED);
    } else {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
};

module.exports = refreshToken;
