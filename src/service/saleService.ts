import SaleRepository from "../repository/saleRepository";
import {SaleRequestBody} from "../models/interface/sale-request-body";
import ProductService from "./productService";
import {SaleProducts} from "../models/entity/saleProducts";
import {Sale} from "../models/entity/sale";
import {SaleFilter} from "../models/interface/sale-filter";

export default class SaleService {
    private repository: SaleRepository = new SaleRepository();
    private productService: ProductService = new ProductService();

    newSale = async (body: SaleRequestBody) => {
        const products = await this.productService.findAllProductsById(body.products.map(product => product.productId));
        let saleProducts: SaleProducts[] = [];
        let newSale = new Sale();
        newSale.totalValue = 0;

        body.products.forEach(product => {
            let saleProduct = new SaleProducts();
            saleProduct.quantity = product.quantity;
            const productExists = products.find(productExist => productExist.id === product.productId);
            if (!productExists) {
                return;
            }
            saleProduct.product = productExists;
            newSale.totalValue += productExists.price;
            saleProducts.push(saleProduct);
        });

        newSale.products = saleProducts;
        await newSale.save();
    }

    reportSale = async (filter: SaleFilter) => {
        return await this.repository.findAll(filter.startDate, filter.endDate);
    }
}