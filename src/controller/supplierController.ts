import {FastifyReply, FastifyRequest} from "fastify";
import {IdRequestParam} from "../models/interface/id-request-param";
import {PaginateQuery} from "../models/interface/paginate-query";
import SupplierService from "../service/supplierService";
import {SupplierRequestBody} from "../models/interface/supplier-request-body";
import {FilterSupplierRequestBody} from "../models/interface/filter-supplier-request-body";

export default class SupplierController {
    private service: SupplierService = new SupplierService();

    deleteSupplierById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const supplier = await this.service.deleteSupplierById(request.params.id);
        reply.status(200).send(supplier);
    }

    newSupplier = async (request: FastifyRequest<{ Body: SupplierRequestBody }>, reply: FastifyReply) => {
        const supplier = await this.service.newSupplier(request.body);
        reply.status(200).send(supplier);
    }

    findAllSuppliers = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const suppliers = await this.service.findAllSuppliers();
        reply.status(200).send(suppliers);
    }

    findSupplierById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const supplier = await this.service.findSupplierById(request.params.id);
        reply.status(200).send(supplier);
    }

    filterSupplier = async (request: FastifyRequest<{ Body: FilterSupplierRequestBody, Querystring: PaginateQuery }>, reply: FastifyReply) => {
        const paginateProjection = await this.service.filterSupplier(request, reply);
        reply.status(200).send(paginateProjection);
    }
}