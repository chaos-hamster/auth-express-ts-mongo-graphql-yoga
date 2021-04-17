import parser from "body-parser";
import compression from "compression";
import cookieparser from "cookie-parser";
import {GraphQLServer} from "graphql-yoga"

export const applyMiddleware = (router: GraphQLServer) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
    router.use(cookieparser());
    router.use(compression());
};