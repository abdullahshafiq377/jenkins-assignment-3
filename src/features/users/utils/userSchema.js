import Joi from 'joi-browser';

const userSchema = {
	name: Joi.string()
	         .min(3)
	         .max(64)
	         .required(),
	phone: Joi.string()
	          .length(10)
	          .required(),
	pickup: Joi.string()
	           .min(3)
	           .required(),
	dropoff: Joi.string()
	            .min(3)
	            .required(),
};

export const userInitialState = {
	name: '',
	phone: '',
	pickup: '',
	dropoff: '',
};
export const defaultPassword = '123456';

export default userSchema;
