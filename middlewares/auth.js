const passport = require("passport")
const Joi = require("joi")
require("../configs/passport-config")

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      })
      return
    }
    req.user = user // записывает (создает) в req ключ со значением = данным юзера
    next()
  })(req, res, next)
}

const joiMiddleware = (req, res, next) => {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  })

  const { error } = joiSchema.validate(req.body)

  if (error) {
    console.log(error)
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Ошибка от Joi",
    })
    return
  }

  next()
}

module.exports = { auth, joiMiddleware }
