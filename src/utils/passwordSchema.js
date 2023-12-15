import Joi from 'joi-browser';

const passwordSchema = {
	password: Joi.string()
	             .min(4)
	             .required(),
	newPassword: Joi.string()
	                .min(4)
	                .required(),
};

export default passwordSchema;
