import BaseJoi from 'joi';
import DateExtension from 'joi-date-extensions';
const Joi = BaseJoi.extend(DateExtension);

export var validateBody = (schema) => {
	return (req, res, next) => {
		const result = req.method != 'GET' ? Joi.validate(req.body, schema) : Joi.validate(req.query, schema);
		if (result.error) {
			return res.status(400).json(result.error);
		}

		if (!req.value) {
			req.value = {};
		}
		req.value['body'] = result.value;
		next();
	}
}

export var schemas = {
    registerSchema: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        phone: Joi.string().length(10).regex(/^[0-9]+$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confhash: Joi.string().valid(Joi.ref('password')).required().error((err) => {
            return "Password does not match."
        }),
    }),
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    dmarcRecord: Joi.object().keys({
        domainId: Joi.number().min(1).required(),
        domain:Joi.string().required(),
        p: Joi.string().required().valid('none','reject','quarantine'),
        rua: Joi.array().optional().allow(null).empty(''),
        ruf: Joi.array().optional().allow(null).empty(''),
        forensicReport: Joi.boolean().optional().default(false),
        fo: Joi.array().optional().allow(null).empty('').items(Joi.string().valid('1','0','d','s') ),
        aspf: Joi.string().optional().valid('s','r'),
        adkim: Joi.string().optional().valid('s','r'),
        sp: Joi.string().optional().valid('none','reject','quarantine'),
        pct: Joi.number().min(0).max(100).required(),
    }),
    itemCreate: Joi.object().keys({
        name:Joi.string().required(),
        price: Joi.number().min(1).required(),
        description: Joi.string().optional()
    }),
    itemUpdate: Joi.object().keys({
        name:Joi.string().optional(),
        price: Joi.number().min(1).optional(),
        description: Joi.string().optional()
    }),
    orderCreate: Joi.object().keys({
        items :Joi.array().required()
    }),
}