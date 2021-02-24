const findUsersService = require('../../../services/user/find-users.service');
const { STATUS_CODE } = require('../../../constants');

const searchUser = async (req, res) => {
  const { uid } = res.locals.user;
  const { q, page } = req.query;

  const regex = new RegExp(q.replace(/[^\w\s]/g, ''), 'i');

  try {
    const users = await findUsersService(
      { 'profile.fullName': regex },
      uid,
      page,
    );

    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = searchUser;
