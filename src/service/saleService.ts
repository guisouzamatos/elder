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

        let acc = 0;
        body.products.forEach(product => {
            let saleProduct = new SaleProducts();
            saleProduct.quantity = product.quantity;
            const productExists = products.find(productExist => productExist.id === product.productId);
            if (!productExists) {
                return;
            }
            saleProduct.productId = productExists.id;
            saleProduct.product = productExists;
            saleProduct.sale = newSale;
            acc = acc + Number(productExists.price);
            saleProducts.push(saleProduct);
        });
        newSale.totalValue = acc;
        newSale.saleDate = new Date();
        const sale = await Sale.save(newSale);
        saleProducts.forEach(saleProduct => saleProduct.saleId = sale.id);
        await SaleProducts.save(saleProducts);
    }

    reportSale = async (filter: SaleFilter) => {
        const sales = await this.repository.findAll(filter.startDate, filter.endDate);
        return sales.map(sale => {
            const products = sale.products.map(product => {
                return {
                    ...product,
                    description: product.product.description,
                    price: `R$ ${Number(product.product.price).toFixed(2)}`,
                    totalValue: `R$ ${(product.product.price * product.quantity).toFixed(2)}`
                }
            })
            return {
                ...sale,
                products,
                totalItems: sale.products.length,
            }
        });
    }
}