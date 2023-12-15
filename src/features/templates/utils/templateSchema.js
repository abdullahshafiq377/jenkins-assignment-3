import Joi from 'joi-browser';

const templateSchema = {
	title: Joi.string()
	          .min(3)
	          .max(64)
	          .required(),
	message: Joi.string()
	            .min(3)
	            .required(),
};

export const templateInitialState = {
	title: '',
	message: ''
};
export default templateSchema;
