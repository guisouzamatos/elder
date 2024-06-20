import {FastifyReply, FastifyRequest} from "fastify";
import StockService from "../service/stockService";
import {StockRequestBody} from "../models/interface/stock-request-body";

export default class StockController {
    private service: StockService = new StockService();

    changeStock = async (request: FastifyRequest<{ Body: StockRequestBody }>, reply: FastifyReply) => {
        const category = await this.service.changeStock(request.body, reply);
        reply.status(200).send(category);
    }
}