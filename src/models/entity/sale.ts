import { AbstractEntity } from "./abstracts/abstractEntity";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { SaleProducts } from "./saleProducts";

@Entity({ name: 'tb_sale' })
export class Sale extends AbstractEntity {

    @PrimaryColumn({ name: 'id_sale' })
    id: number;

    @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2 })
    totalValue: number;

    @CreateDateColumn()
    @Column({ name: 'sale_date', type: 'timestamp' })
    saleDate: Date;

    @OneToMany(() => SaleProducts, saleProducts => saleProducts.sale, {cascade: ["insert"]})
    products: SaleProducts[];
}
