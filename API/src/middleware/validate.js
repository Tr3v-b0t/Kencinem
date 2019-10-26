import Joi from '@hapi/joi';

import Res from '../helpers/responses';

const onError = (error) => {
  if (error[0].type === 'any.required') {
    return new Error(`${error[0].path[0]} is required`);
  }

  return new Error(`${error[0].context.label}`);
};

const options = {
  language: {
    key: '{{key}} '
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
        .label('first name should have at least three alphabetic characters'),
      email: Joi.string()
        .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .required()
        .error(onError)
        .label('please provide a valid email'),
      phoneNumber: Joi.string()
        .regex(/^[a-zA-Z0-9]+$/)
        .min(10)
        .max(13)
        .required()
        .error(onError)
        .label('please provide a valid phone number'),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
        .required()
        .error(onError)
        .label(
          'password should have at least 6 characters, a uppercase,lowercase a number and a special character'
        ),
      role: Joi.valid('user', 'User', 'Agent', 'agent')
        .label('role can only be user or agent')
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
        .label('please provide a valid email'),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
        .required()
        .error(onError)
        .label(
          'password should have at least 6 characters, a uppercase,lowercase a number and a special character'
        )
    });

    validator(req, res, schema, next);
  }

  static reset(req, res) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .required()
        .error(onError)
        .label('please provide a valid email')
    });

    const { error } = Joi.validate(req.body, schema, options);

    if (error) {
      return Res.handleError(400, error.message, res);
    }
  }

  static resetPassword(req, res) {
    const schema = Joi.object().keys({
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
        .required()
        .error(onError)
        .label(
          'password should have at least 6 characters, a uppercase,lowercase a number and a special character'
        )
    });
    const { error } = Joi.validate(req.body, schema, options);
    if (error) {
      return Res.handleError(400, error.message, res);
    }
  }

  static movie(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(128)
        .required()
        .error(onError)
        .label('name should have at least three alphabetic characters'),
      cast: Joi.array()
        .items(
          Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .required()
            .error(onError)
            .label('cast >>>>>>>>>')
        )
        .required()
        .error(onError)
        .label(
          'cast should be an array of at least three alphabetic characters'
        ),

      genre: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(128)
        .required()
        .error(onError)
        .label('genre should have at least three alphabetic characters'),

      status: Joi.valid(
        'now showing',
        'Now Showing',
        'coming soon',
        'available'
      )
        .label('status can only be now showing, coming soon or available')
        .error(onError),
      description: Joi.string()
        // .regex(/^[A-Za]+$/)
        .error(onError)
        .label('please provide a valid description'),
      releaseDate: Joi.string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/)
        .error(onError)
        .label('please provide a valid date using dd-mm-yyyy format'),
      duration: Joi.string()
        .label('duration')
        .error(onError), //datetime
      trailer: Joi.string()
        .regex(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
        )
        .min(3)
        .max(128)
        .required()
        .error(onError)
        .label('please provide a valid trailer url'), //
      country: Joi.string()
        .label('country')
        .error(onError) //array
    });
    validator(req, res, schema, next);
  }
}
