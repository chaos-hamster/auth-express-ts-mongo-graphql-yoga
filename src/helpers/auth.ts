import { Context } from "graphql-yoga/dist/types";
import jwt, { Secret } from "jsonwebtoken";
import secrets from "./secret";

const { appSecret, refreshSecret } = secrets;
export const encode = (args: any, secret: Secret, options: object) => {
    return jwt.sign(args, secret, options) as any;
};
export const decode = (args: any, secret: Secret) => {
    const decoded = jwt.verify(args, secret) as any;
    if (!decoded) {
        throw new Error("Invalid Token");
    }
    return decoded;
};
export const generateAccessToken = (args: any) => {
    const token = encode(args, appSecret, { expiresIn: "15m" });
    return token;
};

export const generateRefreshCookie = (args: any, response: Context) => {
    const refreshToken = encode(args, refreshSecret, { expiresIn: "30d" });
    const auth = response.cookie("refreshtoken", refreshToken, {
        expiresIn: "30d",
        httpOnly: true,
        secure: false,
    });
    return auth;
};

export const verifyToken = (request: Context) => {
    const token = request.headers.authorization.split(" ")[1];
    if (token) {
        const decoded = decode(token, appSecret) as any;
        return decoded;
    }
    throw new Error("Not Authenticated");
};
