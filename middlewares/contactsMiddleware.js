require("../utils/contactSchema")
const Contact = require("../utils/contactSchema")
// const mongoosePaginate = require("mongoose-paginate-v2")

// contactSchema.plugin(mongoosePaginate)

// const Contact = model("contact", contactSchema)

const paginateMiddleware = (req, res, next) => {
  const { page, limit } = req.query
  // console.log(req.query)
  const options = {
    page,
    limit,
  }
  Contact.paginate({}, options, function (error, result) {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    })
    if (error) {
      console.log(error)
    }
    console.log(result)
  })
}

module.exports = {
  paginateMiddleware,
}
