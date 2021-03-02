import { ArgumentValidationError } from 'type-graphql';
import { validate } from "class-validator"

export const validator = async (args: object | undefined) => {

    const error = await validate(args! , { validationError: { target: false }})
    if(error.length > 0){
        throw new ArgumentValidationError(error)
    }

}