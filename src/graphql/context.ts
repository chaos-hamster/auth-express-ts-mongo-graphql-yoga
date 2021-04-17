import { ContextParameters } from "graphql-yoga/dist/types";

import models from "../database/model";

export default function({request, response}: ContextParameters) {
    return {
        models,
        request,
        response,
    };
}