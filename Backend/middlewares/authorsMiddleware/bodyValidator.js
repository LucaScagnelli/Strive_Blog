const { body, validationResult } = require('express-validator')

const bodyValidation = [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('Name must be a valid string and not empty'),
    body('lastname')
        .notEmpty()
        .isString()
        .withMessage('Lastname must be a valid string and not empty'),
    body('email')
        .notEmpty()
        .isString()
        .withMessage('Email must be a valid email address'),
    body('birthDate')
        .isString()
        .optional()
        .withMessage('Date of Birth must be a valid string'),
    body('avatar')
        .notEmpty()
        .isString()
        .withMessage('Avatar must be a valid url'),
    body('password')
        .notEmpty()
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be a valid string'),
]

const bodyValidator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400)
            .json({
                errors: errors.array()
            })
    }
    next()
}


module.exports = {
    bodyValidator,
    bodyValidation
}