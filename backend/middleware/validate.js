const Joi = require('joi');

/**
 * Generic request-body validator middleware factory.
 * Usage: router.post('/', validate(schema), handler)
 */
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: error.details.map((d) => d.message),
        },
      });
    }

    req.body = value;
    next();
  };
}

// ── Schemas ──────────────────────────────────────────────────────────────
const projectCreateSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required(),
  location: Joi.string().trim().min(1).max(200).required(),
  area: Joi.number().positive().required(),
  budget: Joi.number().positive().required(),
  buildingType: Joi.string().valid('Residential', 'Commercial', 'Industrial', 'Mixed').required(),
  floors: Joi.number().integer().min(1).max(200).default(1),
  materialFactor: Joi.number().positive().default(1.0),
  laborFactor: Joi.number().positive().default(1.0),
});

const projectUpdateSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200),
  location: Joi.string().trim().min(1).max(200),
  area: Joi.number().positive(),
  budget: Joi.number().positive(),
  buildingType: Joi.string().valid('Residential', 'Commercial', 'Industrial', 'Mixed'),
  floors: Joi.number().integer().min(1).max(200),
  status: Joi.string(),
}).min(1);

const estimateSchema = Joi.object({
  area: Joi.number().positive().required(),
  buildingType: Joi.string().valid('Residential', 'Commercial', 'Industrial', 'Mixed').required(),
  floors: Joi.number().integer().min(1).max(200).default(1),
  materialFactor: Joi.number().positive().default(1.0),
  laborFactor: Joi.number().positive().default(1.0),
});

const taskStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed', 'blocked').required(),
});

const aiChatSchema = Joi.object({
  prompt: Joi.string().trim().min(1).max(4000).required(),
  context: Joi.object().unknown(true).allow(null),
  history: Joi.array().items(Joi.object().unknown(true)).default([]),
});

const registerSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(72).required(),
  role: Joi.string().trim().max(50).default('Project Manager'),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(1).required(),
});

module.exports = {
  validate,
  projectCreateSchema,
  projectUpdateSchema,
  estimateSchema,
  taskStatusSchema,
  aiChatSchema,
  registerSchema,
  loginSchema,
};
