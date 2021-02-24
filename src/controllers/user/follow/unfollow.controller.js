const unfollowUserService = require('../../../services/user/unfollow.service');
const { STATUS_CODE } = require('../../../constants');

const unfollow = async (req, res) => {
  const { uid } = res.locals.user;
  const { uid: unfollowUid } = req.params;

  try {
    const unfollow = await unfollowUserService(uid, unfollowUid);

    if (!unfollow) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = unfollow;
