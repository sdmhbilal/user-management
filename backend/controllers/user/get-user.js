import DB from '../../config/database';

import { HTTP_CODES } from '../../routes/utils/constants';

const GetUser = async ({ userId }) => {
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

  // Returning the found user
  return {
    user
  };
};

export default GetUser;
