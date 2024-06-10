import {QueryUtils} from "../utils/queryUtils";
import {Category} from "../models/entity/category";
import {FastifyRequest} from "fastify";
import {FilterCategoryRequestBody} from "../models/interface/filter-category-request-body";
import {PaginateQuery} from "../models/interface/paginate-query";

export default class CategoryRepository {

    filterCategory = async (req: FastifyRequest<{ Body: FilterCategoryRequestBody, Querystring: PaginateQuery }>) => {
        const filtro = req.body;
        const paginacao = req.query;
        const description = filtro.description;

        const queryUtils = new QueryUtils();
        const builder = queryUtils.addSelect(`
            "category"."id_category" as "id",
            "category"."description" as "description"
            `)
            .addFrom('"tb_category" "category"');

        if (description) {
            builder.addWhere(` "category"."description" = %$1%`, description);
        }

        return await Category.findPaginate(builder.rawQuery(), queryUtils.getParameters(), paginacao.page, paginacao.size);
    }

    findCategoryByDescription = async (description: string, id?: number) => {
         const builder = Category.createQueryBuilder('category')
            .where('category.description = :description', {description});
         if (id) {
             builder.andWhere('category.id != :id', {id});
         }
         return await builder.getOne();
    }

    findCategoryById = async (id: number) => {
        return await Category.createQueryBuilder('category')
            .leftJoinAndSelect('category.products', 'product')
            .where('category.id = :id', {id})
            .getOne()
    }

    deleteCategoryById = async (id: number) => {
        return await Category.createQueryBuilder('category')
            .where('"tb_category"."id_category" = :id', {id})
            .delete()
            .execute();
    }
}