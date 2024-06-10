import CategoryService from "../service/categoryService";
import {FastifyReply, FastifyRequest} from "fastify";
import {CategoryRequestBody} from "../models/interface/category-request-body";
import {IdRequestParam} from "../models/interface/id-request-param";
import {FilterCategoryRequestBody} from "../models/interface/filter-category-request-body";
import {PaginateQuery} from "../models/interface/paginate-query";

export default class CategoryController {
    private service: CategoryService = new CategoryService();

    deleteCategoryById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const category = await this.service.deleteCategoryById(request.params.id);
        reply.status(200).send(category);
    }

    newCategory = async (request: FastifyRequest<{ Body: CategoryRequestBody }>, reply: FastifyReply) => {
        const category = await this.service.newCategory(request.body);
        reply.status(200).send(category);
    }

    findCategoryById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const category = await this.service.findCategoryById(request.params.id);
        reply.status(200).send(category);
    }

    filterCategory = async (request: FastifyRequest<{ Body: FilterCategoryRequestBody, Querystring: PaginateQuery }>, reply: FastifyReply) => {
        const paginateProjection = await this.service.filterCategory(request, reply);
        reply.status(200).send(paginateProjection);
    }
}