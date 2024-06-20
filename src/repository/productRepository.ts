import {QueryUtils} from "../utils/queryUtils";
import {FastifyRequest} from "fastify";
import {PaginateQuery} from "../models/interface/paginate-query";
import {Product} from "../models/entity/product";
import {FilterProductRequestBody} from "../models/interface/filter-product-request-body";

export default class ProductRepository {

    filterProduct = async (req: FastifyRequest<{ Body: FilterProductRequestBody, Querystring: PaginateQuery }>) => {
        const filtro = req.body;
        const paginacao = req.query;
        const description = filtro?.description;
        const categoryId = filtro?.categoryId;
        const supplierId = filtro?.supplierId;

        const queryUtils = new QueryUtils();
        const builder = queryUtils.addSelect(`
            "product"."id_product" as "id",
            "product"."description" as "description",
            "category"."description" as "categoryDescription",
            "supplier"."name" as "supplierName",
            "product"."price" as "price"
            `)
            .addFrom('"tb_product" "product"')
            .addJoin('LEFT JOIN "tb_category" "category" ON "category"."id_category"="product"."category_id"')
            .addJoin('LEFT JOIN "tb_supplier" "supplier" ON "supplier"."id_supplier"="product"."supplier_id"');

        if (description) {
            builder.addWhere(` "product"."description" = %$1%`, description);
        }

        if (categoryId) {
            builder.addWhere(` "product"."category_id" = %$1%`, categoryId);
        }

        if (supplierId) {
            builder.addWhere(` "product"."supplier_id" = $1`, supplierId);
        }

        return await Product.findPaginate(builder.rawQuery(), queryUtils.getParameters(), paginacao.page, paginacao.size);
    }

    findProductByDescription = async (description: string, id?: number) => {
        const builder = Product.createQueryBuilder('product')
            .where('product.description = :description', {description});
        if (id) {
            builder.andWhere('product.id != :id', {id});
        }
        return await builder.getOne();
    }

    findProductById = async (id: number) => {
        return await Product.createQueryBuilder('product')
            .innerJoinAndSelect('product.category', 'category')
            .innerJoinAndSelect('product.supplier', 'supplier')
            .where('product.id = :id', {id})
            .getOne()
    }

    findAllProductsById = async (ids: number[]) => {
        return await Product.createQueryBuilder('product')
            .whereInIds(ids)
            .getMany();
    }

    deleteProductById = async (id: number) => {
        return await Product.createQueryBuilder('product')
            .where('"tb_product"."id_product" = :id', {id})
            .delete()
            .execute();
    }

    deleteAllProductsById = async (ids: number[]) => {
        return await Product.createQueryBuilder('product')
            .where('"tb_product"."id_product" IN (:...ids)', {ids})
            .delete()
            .execute();
    }
}