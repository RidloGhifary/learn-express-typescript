import jwt from "jsonwebtoken";
import CONFIG from "../config/environment";

export const signJwt = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, CONFIG.jwtSecret as string, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.jwtPublic as string);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};
