import {Supplier} from "../models/entity/supplier";

export default class SupplierRepository {
    findSupplierById = async (id: number) => {
        return await Supplier.createQueryBuilder('supplier')
            .where('supplier.id = :id', {id})
            .getOne()
    }
}