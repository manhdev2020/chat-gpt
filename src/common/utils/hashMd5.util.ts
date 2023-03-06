const crypto = require('crypto');
export const hashMd5 = (value: string) => {
  const hash = crypto.createHash('md5');
  hash.update(value);
  return hash.digest('hex');
};
