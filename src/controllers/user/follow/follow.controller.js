const followUserService = require('../../../services/user/follow.service');
const { STATUS_CODE } = require('../../../constants');

const follow = async (req, res) => {
  const { uid } = res.locals.user;
  const { uid: followUid } = req.params;

  try {
    const follow = await followUserService(uid, followUid);

    if (!follow) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = follow;
