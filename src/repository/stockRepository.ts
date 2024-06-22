import {Stock} from "../models/entity/stock";

export default class StockRepository {

    findStockByProductId = async (productId: number) => {
        return await Stock.createQueryBuilder('stock')
            .leftJoinAndSelect('stock.product', 'product')
            .where('product.id = :productId', {productId})
            .getOne();
    }
}