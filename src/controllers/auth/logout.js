const User = require('../../models/user');
const { STATUS_CODE } = require('../../constants');

const logout = async (_, res) => {
  const { uid } = res.locals.user;
  try {
    await User.updateOne({ uid }, { status: 'INACTIVE' });
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = logout;
