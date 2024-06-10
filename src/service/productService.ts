import ProductRepository from "../repository/productRepository";
import {Product} from "../models/entity/product";
import {FastifyReply, FastifyRequest} from "fastify";
import {PaginateQuery} from "../models/interface/paginate-query";
import {ProductRequestBody} from "../models/interface/product-request-body";
import {FilterProductRequestBody} from "../models/interface/filter-product-request-body";
import CategoryService from "./categoryService";
import SupplierService from "./supplierService";


export default class ProductService {
    private categoryService: CategoryService;
    private supplierService: SupplierService = new SupplierService();
    private repository: ProductRepository = new ProductRepository();

    private getCategoryService() {
        if (!this.categoryService) {
            this.categoryService = new CategoryService();
        }
        return this.categoryService;
    }

    deleteProductById = async (id: number) => {
        const product = await this.repository.findProductById(id);
        if (!product) {
            throw {status: 400, message: 'Produto não existe.'};
        }
        await this.repository.deleteProductById(id);
        return product;
    };

    deleteAllProductsById = async (ids: number[]) => {
        await this.findAllProductsById(ids);
        await this.repository.deleteAllProductsById(ids);
    };

    newProduct = async (body: ProductRequestBody) => {
        let product: Product = new Product();
        if (body.id) {
            product = await this.findProductById(body.id);
        }
        const categoryByName = await this.findProductByDescription(body.description, body.id);
        if (categoryByName) {
            throw {status: 400, message: 'Produto já existe.'};
        }
        product.description = body.description;
        product.price = body.price;
        const supplier = await this.supplierService.findSupplierById(body.supplierId);
        product.supplier = supplier;
        const category = await this.getCategoryService().findCategoryById(body.categoryId);
        product.category = category;
        await product.save();
    }

    findAllProductsById = async (ids: number[]) => {
        const products: Product[] = await this.repository.findAllProductsById(ids);
        const notFoundIds: number[] = [];

        for (const id of ids) {
            const product = products.find(product => product.id === id);
            if (!product) {
                notFoundIds.push(id);
            }
        }

        if (notFoundIds.length > 0) {
            throw {status: 400, message: `Produtos com ids: ${notFoundIds.join(', ')} não existem.`};
        }

        return products;
    };

    findProductByDescription = async (description: string, id?: number) => {
        return await this.repository.findProductByDescription(description, id);
    };

    findProductById = async (id: number) => {
        const product = await this.repository.findProductById(id);
        if (!product) {
            throw {status: 400, message: 'Produto não existe.'};
        }
        return product;
    };

    filterProduct = async (req: FastifyRequest<{ Body: FilterProductRequestBody, Querystring: PaginateQuery }>, reply: FastifyReply) => {
        const productPage = await this.repository.filterProduct(req);
        return productPage;
    };
}