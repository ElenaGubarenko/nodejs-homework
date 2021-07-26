const express = require("express")
const router = express.Router()
const functions = require("../../model/auth")
const middlewares = require("../../middlewares/auth")

router.post("/register", middlewares.joiMiddleware, functions.register)

router.post("/login", middlewares.joiMiddleware, functions.login)

router.post("/logout", middlewares.auth, functions.logout)

router.get("/current", middlewares.auth, functions.current)

module.exports = router
