import { Request, Response, NextFunction } from 'express';
import InsurancePolicyRepository from '../repositories/insurancePolicyRepository';
import NotFoundError from '../errors/notFoundError';

class InsurancePolicyController {

    public async getAllPolicies(req: Request, res: Response, next: NextFunction) {
        try {
            const insurancePolicyRepository = new InsurancePolicyRepository()
            const limit = parseInt(req.query.limit as string ?? 10)
            const offset = parseInt(req.query.offset as string ?? 0)
            const policies = await insurancePolicyRepository.getAll(limit, offset)
            res.status(200).json(policies)
        } catch (err) {
            next(err)
        }

    }

    public async createPolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const insurancePolicyRepository = new InsurancePolicyRepository()
            const policy = await insurancePolicyRepository.create(req.body)
            res.status(201).json(policy)
        } catch (err) {
            next(err)
        }
    }

    public async getPolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: policyID } = req.params
            const insurancePolicyRepository = new InsurancePolicyRepository()
            const policy = await insurancePolicyRepository.getItem(policyID)
            if (!policy) {
                throw new NotFoundError("Entity not found");
                // return res.status(404).json({ message: `No policy found with id: ${policyID}` })
            }
            res.status(200).json(policy)
        } catch (err) {
            next(err)
        }
    }

    public async updatePolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const insurancePolicyRepository = new InsurancePolicyRepository()
            const { id: policyID } = req.params
            const policy = await insurancePolicyRepository.update(policyID, req.body)
            if (!policy) {
                return res.status(404).json({ message: `No policy found with id: ${policyID}` })
            }
            res.status(200).json(policy)

        } catch (err) {
            next(err)
        }
    }

    public async deletePolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const insurancePolicyRepository = new InsurancePolicyRepository()
            const { id: policyID } = req.params
            const policy = await insurancePolicyRepository.findOneAndDelete(policyID)
            if (!policy) {
                return res.status(404).json({ message: `No policy found with id: ${policyID}` })
            }
            res.status(200).json({ message: 'Record deleted' })

        } catch (err) {
            next(err)
        }
    }

}

export default InsurancePolicyController
