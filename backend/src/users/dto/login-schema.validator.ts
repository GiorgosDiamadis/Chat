import {required} from "joi";

const Joi = require('joi')

export const loginSchemaValidator = Joi.object(
    {
        username: Joi
            .string()
            .min(5)
            .max(16)
            .alphanum()
            .required()
            .messages({
                "string.base": `Username should be a type of 'text'`,
                "string.empty": `Username cannot be an empty field`,
                "string.min": `Username should have a minimum length of 5`,
                "string.max": `Username should have a maximum length of 16`,
                "any.required": `Username is a required field`
            }),
        password: Joi
            .string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
            .messages({"string.empty": 'Password cannot be an empty field!'}),
    }
)