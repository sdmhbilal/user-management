import DB from '../../config/database';

import { HTTP_CODES } from '../../routes/utils/constants';

const DeleteUser = async ({ userId }) => {
  // Finding the user in the database by ID
  const user = await DB.users.findOne({
    where: { id: userId }
  });

  // If the user is not found, throw an error with a 404 status code
  if (!user) {
    const err = new Error();
    err.statusCode = HTTP_CODES.NOT_FOUND;
    err.error = 'User Not Found!';

    throw err;
  }

  // Deleting the user
  await DB.users.destroy({
    where: { id: userId }
  });

  return {
    message: 'User Deleted Successfully!'
  };
};

export default DeleteUser;
