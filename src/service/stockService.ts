import {FastifyReply} from "fastify";
import {StockRequestBody} from "../models/interface/stock-request-body";
import ProductService from "./productService";
import {Stock} from "../models/entity/stock";
import StockRepository from "../repository/stockRepository";

export default class StockService {
    private repository: StockRepository = new StockRepository();
    private productService: ProductService = new ProductService();

    changeStock = async (body: StockRequestBody, reply: FastifyReply) => {
        const products = await this.productService.findAllProductsById(body.stocks.map(stock => stock.productId));
        for (const stock of body.stocks) {
            let newStock = await this.findStockByProduct(stock.productId);
            const product = products.find(product => product.id === stock.productId);
            if (!product) {
                return;
            }
            if (!newStock) {
                newStock = new Stock();
                newStock.quantity = stock.quantity;
                newStock.addition = body.add;
                newStock.product = product;
                newStock.totalValue = product.price * stock.quantity;
                return await newStock.save();
            }
            if (body.add) {
                newStock.quantity += stock.quantity;
            } else {
                newStock.quantity -= stock.quantity;
                if (newStock.quantity < 0) {
                    throw { status: 400, message: 'Estoque inválido.' };
                }
            }
            newStock.totalValue = product.price * stock.quantity;
            return await newStock.save();
        }
    }

    findStockByProduct = async (productId: number): Promise<Stock | null> => {
        return await this.repository.findStockByProductId(productId);
    }
}