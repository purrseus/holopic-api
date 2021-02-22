const User = require('../../../models/user');
const { STATUS_CODE } = require('../../../constants');

const getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid }); // follow ??

    !user
      ? res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Not found' })
      : res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getUser;
