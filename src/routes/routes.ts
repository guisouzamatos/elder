import { FastifyInstance } from 'fastify';
import CategoryController from "../controller/categoryController";
import ProductController from "../controller/productController";
import SupplierController from "../controller/supplierController";
import StockController from "../controller/stockController";
import SaleController from "../controller/saleController";

export default async function routes(fastify): Promise<void> {

    const categoryController = new CategoryController();
    const productController = new ProductController();
    const saleController = new SaleController();
    const supplierController = new SupplierController();
    const stockController = new StockController();

    //Category
    fastify.post('/category/new', categoryController.newCategory);
    fastify.get('/category', categoryController.findAllCategories);
    fastify.get('/category/:id', categoryController.findCategoryById);
    fastify.post('/category/filter', categoryController.filterCategory);
    fastify.delete('/category/:id', categoryController.deleteCategoryById);

    //Product
    fastify.post('/product/new', productController.newProduct);
    fastify.get('/product/:id', productController.findProductById);
    fastify.get('/product', productController.findAllProducts);
    fastify.post('/product/filter', productController.filterProduct);
    fastify.delete('/product/:id', productController.deleteProductById);

    //Sale
    fastify.post('/sale', saleController.newSale);
    fastify.post('/sale/report', saleController.reportSale);

    //Supplier
    fastify.post('/supplier/new', supplierController.newSupplier);
    fastify.get('/supplier', supplierController.findAllSuppliers);
    fastify.get('/supplier/:id', supplierController.findSupplierById);
    fastify.post('/supplier/filter', supplierController.filterSupplier);
    fastify.delete('/supplier/:id', supplierController.deleteSupplierById);

    //Stock
    fastify.post('/stock', stockController.changeStock);
}
