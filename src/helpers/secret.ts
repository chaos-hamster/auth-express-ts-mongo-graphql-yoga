import {config} from "dotenv";
import {Secret} from "jsonwebtoken";
config();

export default ({
    appSecret : process.env.APP_SECRET as Secret,
    refreshSecret: process.env.REFRESH_SECRET as Secret,
});