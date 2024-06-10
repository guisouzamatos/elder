import { FastifyInstance } from 'fastify';
import CategoryController from "../controller/categoryController";
import ProductController from "../controller/productController";

export default async function routes(fastify): Promise<void> {

    const categoryController = new CategoryController();
    const productController = new ProductController();

    //Category
    fastify.post('/category/new', categoryController.newCategory);
    fastify.get('/category/:id', categoryController.findCategoryById);
    fastify.post('/category/filter', categoryController.filterCategory);
    fastify.delete('/category/:id', categoryController.deleteCategoryById);

    //Product
    fastify.post('/product/new', productController.newProduct);
    fastify.get('/product/:id', productController.findProductById);
    fastify.post('/product/filter', productController.filterProduct);
    fastify.delete('/product/:id', productController.deleteProductById);
}
