import {Supplier} from "../models/entity/supplier";
import {FastifyRequest} from "fastify";
import {PaginateQuery} from "../models/interface/paginate-query";
import {QueryUtils} from "../utils/queryUtils";
import {FilterSupplierRequestBody} from "../models/interface/filter-supplier-request-body";

export default class SupplierRepository {

    filterSupplier = async (req: FastifyRequest<{ Body: FilterSupplierRequestBody, Querystring: PaginateQuery }>) => {
        const filtro = req.body;
        const paginacao = req.query;
        const name = filtro?.name;

        const queryUtils = new QueryUtils();
        const builder = queryUtils.addSelect(`
            "supplier"."id_supplier" as "id",
            "supplier"."name" as "name"
            "supplier"."contact" as "contact"
            `)
            .addFrom('"tb_supplier" "supplier"');

        if (name) {
            builder.addWhere(` "supplier"."name" = %$1%`, name);
        }

        return await Supplier.findPaginate(builder.rawQuery(), queryUtils.getParameters(), paginacao.page, paginacao.size);
    }

    deleteSupplierById = async (id: number) => {
        return await Supplier.createQueryBuilder('supplier')
            .where('"tb_supplier"."id_supplier" = :id', {id})
            .delete()
            .execute();
    }

    findSupplierById = async (id: number) => {
        return await Supplier.createQueryBuilder('supplier')
            .where('supplier.id = :id', {id})
            .getOne()
    }

    findSupplierByName = async (name: string, id?: number) => {
        const builder = Supplier.createQueryBuilder('supplier')
            .where('supplier.name = :name', {name});
        if (id) {
            builder.andWhere('supplier.id != :id', {id});
        }
        return await builder.getOne();
    }
}