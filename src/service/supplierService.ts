import SupplierRepository from "../repository/supplierRepository";
import {Supplier} from "../models/entity/supplier";
import {SupplierRequestBody} from "../models/interface/supplier-request-body";
import {FastifyReply, FastifyRequest} from "fastify";
import {PaginateQuery} from "../models/interface/paginate-query";
import {FilterSupplierRequestBody} from "../models/interface/filter-supplier-request-body";

export default class SupplierService {
    private repository: SupplierRepository = new SupplierRepository();

    deleteSupplierById = async (id: number) => {
        const supplier = await this.repository.findSupplierById(id);
        if (!supplier) {
            throw {status: 400, message: 'Fornecedor não existe.'};
        }
        await this.repository.deleteSupplierById(id);
        return supplier;
    };

    findAllSuppliers = async () => {
        return await this.repository.findAllSuppliers();
    }

    findSupplierById = async (id: number) => {
        const supplier = await this.repository.findSupplierById(id);
        if (!supplier) {
            throw {status: 400, message: 'Fornecedor não existe.'};
        }
        return supplier;
    };

    newSupplier = async (body: SupplierRequestBody) => {
        let supplier: Supplier = new Supplier();
        if (body.id) {
            supplier = await this.findSupplierById(body.id);
        }
        const supplierByName = await this.findSupplierByName(body.name, body.id);
        if (supplierByName) {
            throw {status: 400, message: 'Fornecedor já existe.'};
        }
        supplier.name = body.name;
        supplier.contact = body.contact;
        await supplier.save();
    }

    findSupplierByName = async (name: string, id?: number) => {
        return await this.repository.findSupplierByName(name, id);
    };

    filterSupplier = async (req: FastifyRequest<{ Body: FilterSupplierRequestBody, Querystring: PaginateQuery }>, reply: FastifyReply) => {
        const productPage = await this.repository.filterSupplier(req);
        return productPage;
    };
}