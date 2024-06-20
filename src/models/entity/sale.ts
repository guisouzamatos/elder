import {AbstractEntity} from "./abstracts/abstractEntity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Product} from "./product";

@Entity({name: 'tb_sale'})
export class Sale extends AbstractEntity {

    @PrimaryColumn({name: 'id_sale'})
    id: number;

    @Column({name: 'quantity'})
    quantity: number;

    @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2 })
    totalValue: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}