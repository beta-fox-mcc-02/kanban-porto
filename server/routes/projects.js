const express = require ('express')
const router = express.Router()
const authentication = require ('../middlewares/authentication')
const ProjectController = require ('../controllers/projectController')

router.post('/', authentication, ProjectController.create)
router.get('/:id', authentication, ProjectController.getOne)
router.put('/:id', authentication, ProjectController.update)
router.delete('/:id', authentication, ProjectController.delete)

module.exports = router