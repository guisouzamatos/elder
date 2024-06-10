import SupplierRepository from "../repository/supplierRepository";

export default class SupplierService {
    private repository: SupplierRepository = new SupplierRepository();

    findSupplierById = async (id: number) => {
        const supplier = await this.repository.findSupplierById(id);
        if (!supplier) {
            throw {status: 400, message: 'Fornecedor não existe.'};
        }
        return supplier;
    };
}