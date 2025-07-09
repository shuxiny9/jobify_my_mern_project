import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
                 //  签名 = HMACSHA256(base64(header) + "." + base64(payload), SECRET)
                          // JWT 库自动完成这个过程
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};