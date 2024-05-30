import bcrypt from 'bcrypt';

import DB from '../../config/database';

const { SALT_ROUNDS } = process.env;

const AddUser = async ({
  name,
  email,
  password
}) => {
  // Hashing the password
  const hashSalt = parseInt(SALT_ROUNDS, 10) || 10;
  const hashedPassword = await bcrypt.hash(password, hashSalt);

  // Inserting  a new user record
  await DB.users.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    message: 'User Created Successfully!'
  };
};

export default AddUser;
