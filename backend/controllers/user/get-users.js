import DB from '../../config/database';

const GetUsers = async ({ limit, skip }) => {
  // Retrieve all user records
  const users = await DB.users.findAll({
    offset: skip,
    limit
  });

  // Retrieve total number of records
  const total = await DB.users.count();

  // Returning the retrieved users
  return {
    users,
    total
  };
};

export default GetUsers;
