const findUserService = require('../../../services/user/find-user.service');
const { STATUS_CODE } = require('../../../constants');

const getUser = async (req, res) => {
  const { uid } = req.params;
  const { uid: myUid } = res.locals.user;

  try {
    const user = await findUserService(uid, myUid);

    !user
      ? res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Not found' })
      : res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getUser;
