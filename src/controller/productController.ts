import {FastifyReply, FastifyRequest} from "fastify";
import {IdRequestParam} from "../models/interface/id-request-param";
import {PaginateQuery} from "../models/interface/paginate-query";
import ProductService from "../service/productService";
import {FilterProductRequestBody} from "../models/interface/filter-product-request-body";
import {ProductRequestBody} from "../models/interface/product-request-body";

export default class ProductController {
    private service: ProductService = new ProductService();

    deleteProductById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const category = await this.service.deleteProductById(request.params.id);
        reply.status(200).send(category);
    }

    newProduct = async (request: FastifyRequest<{ Body: ProductRequestBody }>, reply: FastifyReply) => {
        const category = await this.service.newProduct(request.body);
        reply.status(200).send(category);
    }

    findProductById = async (request: FastifyRequest<{ Params: IdRequestParam }>, reply: FastifyReply) => {
        const category = await this.service.findProductById(request.params.id);
        reply.status(200).send(category);
    }

    filterProduct = async (req: FastifyRequest<{ Body: FilterProductRequestBody, Querystring: PaginateQuery }>, reply: FastifyReply) => {
        const paginateProjection = await this.service.filterProduct(req, reply);
        reply.status(200).send(paginateProjection);
    }
}