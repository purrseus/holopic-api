const findUsersService = require('../../../services/user/find-users');
const { STATUS_CODE } = require('../../../constants');

const getFollowing = async (req, res) => {
  const { uid } = res.locals.user;
  const { page } = req.query;

  if ((!!page && Number.isNaN(+page)) || +page <= 0) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const users = await findUsersService(
      { 'profile.followers': uid },
      uid,
      page,
    );
    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getFollowing;
