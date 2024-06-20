import CategoryRepository from "../repository/categoryRepository";
import {CategoryRequestBody} from "../models/interface/category-request-body";
import {Category} from "../models/entity/category";
import {FastifyReply, FastifyRequest} from "fastify";
import {FilterCategoryRequestBody} from "../models/interface/filter-category-request-body";
import {PaginateQuery} from "../models/interface/paginate-query";
import ProductService from "./productService";

export default class CategoryService {
    private productService;
    private repository: CategoryRepository = new CategoryRepository();

    private getProductService() {
        if (!this.productService) {
            this.productService = new ProductService();
        }
        return this.productService;
    }


    deleteCategoryById = async (id: number) => {
        const category = await this.repository.findCategoryById(id);
        if (!category) {
            throw {status: 400, message: 'Categoria não existe.'};
        }
        const products = category.products;
        const productsIds = products.map(product => product.id);
        if (productsIds.length > 0) {
            throw {status: 400, message: 'Categoria não pode ser excluída pois está associada à um produto.'};
        }
        await this.repository.deleteCategoryById(id);
        return category;
    };

    newCategory = async (body: CategoryRequestBody) => {
        let category: Category = new Category();
        if (body.id) {
            category = await this.findCategoryById(body.id);
        }
        const categoryByName = await this.findCategoryByDescription(body.description, body.id);
        if (categoryByName) {
            throw {status: 400, message: 'Categoria já existe.'};
        }
        category.description = body.description;
        await category.save();
    }

    findAllCategories = async () => {
        return await this.repository.findAllCategories();
    }

    findCategoryByDescription = async (description: string, id?: number) => {
        return await this.repository.findCategoryByDescription(description, id);
    };

    findCategoryById = async (id: number) => {
        const category = await this.repository.findCategoryById(id);
        if (!category) {
            throw {status: 400, message: 'Categoria não existe.'};
        }
        return category;
    };

    filterCategory = async (req: FastifyRequest<{
        Body: FilterCategoryRequestBody,
        Querystring: PaginateQuery
    }>, reply: FastifyReply) => {
        const categoryPage = await this.repository.filterCategory(req);
        return categoryPage;
    };
}