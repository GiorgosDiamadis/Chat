const Joi = require('joi')

export const createRoomSchemaValidator = Joi.object(
    {
        name: Joi.string().min(5).max(16).alphanum().required(),
    }
)