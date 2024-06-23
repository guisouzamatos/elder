import {Sale} from "../models/entity/sale";

export default class SaleRepository {
    findAll = async (startDate: Date, endDate: Date) => {
        return await Sale.createQueryBuilder('sale')
            .leftJoinAndSelect('sale.products', 'saleProducts')
            .leftJoinAndSelect('saleProducts.product', 'product')
            .where('sale.saleDate BETWEEN :startDate AND :endDate', { startDate, endDate })
            .getMany();
    };
}