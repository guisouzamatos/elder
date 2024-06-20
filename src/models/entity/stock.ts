import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {AbstractEntity} from "./abstracts/abstractEntity";
import {Product} from "./product";

@Entity({name: 'tb_stock'})
export class Stock extends AbstractEntity {

    @PrimaryColumn({ name: 'id_stock' })
    id: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({name: 'addition'})
    addition: boolean;

    @Column({name: 'quantity'})
    quantity: number;

    @Column({ name: 'total_value'})
    totalValue: number;
}