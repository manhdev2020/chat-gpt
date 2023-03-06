import * as bcrypt from 'bcrypt';

export const hashPassword = async (
  password: string,
  salt = 10,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const isValidPassword = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, userPassword);
};
