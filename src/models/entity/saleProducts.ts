import {AbstractEntity} from "./abstracts/abstractEntity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Product} from "./product";
import {Sale} from "./sale";

@Entity({name: 'tb_sale_products'})
export class SaleProducts extends AbstractEntity {

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Sale, sale => sale.products)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Column({name: 'quantity'})
    quantity: number;
}
