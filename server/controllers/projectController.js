const { Project } = require('../models')
const { UserProject } = require('../models')
const { Task } = require('../models')

class ProjectController {
   static create(req, res, next) {
      let newProject
      Project.create({ title: req.body.title })
         .then(data => {
            newProject = data

            return UserProject.create({
               UserId: req.currentUserId,
               ProjectId: data.id
            })
         })
         .then(UserProject => {
            res.status(201).json({ project: newProject, UserProject: UserProject })
         })
         .catch(err => {
            next(err)
         })
   }

   static getOne(req, res, next) {
      Project.findOne({
         where: {
            id: req.params.id
         },
         include: {
            model: Task
         }
      })
         .then(data => {
            if(data) {
               res.status(200).json(data)
            }
            else {
               next({code: 404, message: `Project with id ${req.params.id} not found`})
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      Project.update({ title: req.body.title }, {
         where: {
            id: req.params.id
         },
         returning: true
      })
         .then(data => {
            if (data[0] === 0) {
               next({ code: 404, message: `cannot find project with id ${req.params.id}` })
            }
            else {
               res.status(200).json(data[1][0])
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static delete(req, res, next) {
      Project.destroy({
         where: {
            id: req.params.id
         }
      })
         .then(data => {
            if (data === 0) {
               next({ code: 404, message: `cannot find project with id ${req.params.id}` })
            }
            else {
               return Task.destroy({
                  where: {
                     ProjectId: req.params.id
                  }
               })
            }
         })
         .then(_ => {
            return UserProject.destroy({
               where: {
                  ProjectId: req.params.id
               }
            })
         })
         .then(_ => {
            res.status(200).json({msg: `Project with id ${req.params.id} has been deleted`})
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = ProjectController