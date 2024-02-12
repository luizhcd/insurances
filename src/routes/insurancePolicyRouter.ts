import express from 'express'
import InsurancePolicyController from '../controllers/insurancePolicyController'

const polictyRouter = express.Router()
const controller = new InsurancePolicyController()

polictyRouter.route('/').get(controller.getAllPolicies) 
polictyRouter.route('/').post(controller.createPolicy)
polictyRouter.route('/:id').get(controller.getPolicy)
polictyRouter.route('/:id').put(controller.updatePolicy)
polictyRouter.route('/:id').delete(controller.deletePolicy)


export default polictyRouter