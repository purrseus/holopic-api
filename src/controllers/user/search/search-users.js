const User = require('../../../models/user');
const { STATUS_CODE } = require('../../../constants');

const searchUser = async (req, res) => {
  const { q, page } = req.query;

  if ((!!page && Number.isNaN(+page)) || +page <= 0) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  const regex = new RegExp(q.replace(/[^\w\s]/g, ''), 'i');

  try {
    const users = await User.find({ 'userProfile.fullName': regex }) // follow ??
      .skip((page - 1) * 10)
      .limit(10);

    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = searchUser;
