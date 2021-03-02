import { GraphQLError } from "graphql";

export const formatError = (err: GraphQLError) => {
    
    let errObj: {
        types: { [key:string]: string }[]
    } = {
        types: []
    }

    if(err.message === "Argument Validation Error") {
        err.extensions!.exception.validationErrors.forEach((error: any) => {
            errObj["types"].push(error.constraints)
        });
        return {
            message: err.message,
            errors: errObj
        }
    }
    return {
        message: err.message
    }
}