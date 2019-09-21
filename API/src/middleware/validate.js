import Joi from "@hapi/joi";

import Res from "../helpers/responses";

const onError = (error) => {
    if (error[0].type === "any.required") {
        return new Error(`${error[0].path[0]} is required`);
    }

    return new Error(`${error[0].context.label}`);
};

const options = {
    language: {
        key: "{{key}} "
    }
};

const validator = (req, res, schema, next) => {
    const { error } = Joi.validate(req.body, schema, options);

    if (error) {
        return Res.handleError(400, error.message, res);
    }
    next();
};

export default class Validate {
    // Create new Property Validation
    static user(req, res, next) {
        const schema = Joi.object().keys({
            name: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .min(3)
                .max(128)
                .required()
                .error(onError)
                .label(
                    "first name should have at least three alphabetic characters"
                ),
            email: Joi.string()
                .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
                .required()
                .error(onError)
                .label("please provide a valid email"),
            phoneNumber: Joi.string()
                .regex(/^[a-zA-Z0-9]+$/)
                .min(10)
                .max(13)
                .required()
                .error(onError)
                .label("please provide a valid phone number"),
            password: Joi.string()
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/
                )
                .required()
                .error(onError)
                .label(
                    "password should have at least 6 characters, a uppercase,lowercase a number and a special character"
                ),
            role: Joi.valid("user",'User','Agent', "agent")
                .label("role can only be user or agent")
                .error(onError)
        });

        validator(req, res, schema, next);
    }

    static login(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string()
                .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
                .required()
                .error(onError)
                .label("please provide a valid email"),
            password: Joi.string()
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/
                )
                .required()
                .error(onError)
                .label(
                    "password should have at least 6 characters, a uppercase,lowercase a number and a special character"
                ),
        });
        
        validator(req, res, schema, next);
    }

    static reset(req, res) {
        const schema = Joi.object().keys({
            email: Joi.string()
                .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
                .required()
                .error(onError)
                .label("please provide a valid email"),
        });
        
        const { error } = Joi.validate(req.body, schema, options);

        if (error) {
            return Res.handleError(400, error.message, res);
        }
    }

    static resetPassword(req, res) {
        const schema = Joi.object().keys({
            password: Joi.string()
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/
                )
                .required()
                .error(onError)
                .label(
                    "password should have at least 6 characters, a uppercase,lowercase a number and a special character"
                ),
        });
        const { error } = Joi.validate(req.body, schema, options);
        if (error) {
            return Res.handleError(400, error.message, res);
        }
    }
}
