const User = require('../user/user-model')

const uniqueUsername = async (req,res,next) => {
const user = await User.getByUsername(req.body.username)
if (user) {return next({status: 422, message: "username taken"})}
else {next()}
}

module.exports = {
    uniqueUsername
}