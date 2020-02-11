const {UserTask } = require('../models')

module.exports = (req, res, next) => {
   UserTask.findOne({
      where: {
         Userid : req.currentUserId,
         TaskId : req.body.TaskId
      }
   })
      .then(data => {
         if (!data) {
            next({code : 401})
         }
         else {
            next()
         }
      })
      .catch (err => {
         next(err)
      })
}