import insurancePolicy from "../models/insurancePolicy";
import BaseRepository from "./baseRepository";

export default class insurancePolicyRepository extends BaseRepository<insurancePolicy> {
    constructor() {
        super(insurancePolicy)
    }
}
