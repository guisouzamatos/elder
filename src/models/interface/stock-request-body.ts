import {StockObject} from "./stock-object";

export interface StockRequestBody {
    stocks: StockObject[];
    add: boolean;
}