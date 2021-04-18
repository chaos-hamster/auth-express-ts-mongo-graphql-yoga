import { Context } from "graphql-yoga/dist/types";
import utils from "../helpers/utils";
const { auth, secret } = utils;

export const signup = async (parent: any, args: any, { models, response }: Context) => {
    try {
        const userEmailExists = await models.user.findOne({ email: args.input.email });
        if (userEmailExists) {
            throw new Error("Email already exists");
        }
        const user = await models.user.create(args.input);
        auth.generateRefreshCookie({id: user.id}, response);
        const token = auth.generateAccessToken({ id: user.id });
        return { user, token };
    } catch (err) {
        throw new Error(err.toString());
    }
};


export const login = async (parent: any, args: any, { models, request, response }: Context) => {
    try {
        const user = await models.user.findOne({ email: args.input.email });
        if (!user || !user.comparePassword(args.input.password)) {
            throw new Error("Invalid user login details");
        }
        auth.generateRefreshCookie({ id: user.id}, response);
        const token = auth.generateAccessToken({ id: user.id });
        return { user, token };
    } catch (err) {
        throw new Error(err.toString());
    }
};

export const refresh = async (parent: any, args: any, { request, response }: Context) => {
    try {
        const token = request.cookies.refreshtoken;
        if (!token) {
            throw new Error("No Refresh Token found");
        }
        const decoded = auth.decode(token, secret.refreshSecret);
        await auth.generateRefreshCookie({id: decoded.id}, response);
        return auth.generateAccessToken({ id: decoded.id });
    } catch (err) {
        throw new Error(err.toString());
    }
};

export const doSomething = async (parent: any, args: any, { request }: Context) => {
    try {
        const decoded = await auth.verifyToken(request)
        // then do something on token verification
        return 'something for you: ' + decoded.id;
    }
    catch(err) {
        throw new Error (err.toString())
    }
}
const resolvers = {
    Query: {
        refresh
    },
    Mutation: {
        signup,
        login,
        doSomething
    }
}

export default resolvers;