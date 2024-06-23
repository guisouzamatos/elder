import SaleService from "../service/saleService";
import {FastifyReply, FastifyRequest} from "fastify";
import {SaleRequestBody} from "../models/interface/sale-request-body";
import {SaleFilter} from "../models/interface/sale-filter";

export default class SaleController {
    private service: SaleService = new SaleService();

    newSale = async (request: FastifyRequest<{ Body: SaleRequestBody }>, reply: FastifyReply) => {
        const sale = await this.service.newSale(request.body);
        reply.status(200).send(sale);
    }

    reportSale = async (request: FastifyRequest<{ Body: SaleFilter }>, reply: FastifyReply) => {
        const sales = await this.service.reportSale(request.body, reply);
        reply.status(200).send(sales);
    }
}