const findAccountService = require('../../../services/user/find-account.service');
const { STATUS_CODE } = require('../../../constants');

const getMyAccount = async (_, res) => {
  const { uid } = res.locals.user;
  try {
    const user = await findAccountService(uid);

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getMyAccount;
