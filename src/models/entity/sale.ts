import { AbstractEntity } from "./abstracts/abstractEntity";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { SaleProducts } from "./saleProducts";

@Entity({ name: 'tb_sale' })
export class Sale extends AbstractEntity {

    @PrimaryGeneratedColumn({ name: 'id_sale' })
    id: number;

    @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2 })
    totalValue: number;

    @CreateDateColumn({ name: 'sale_date', type: "timestamp" })
    saleDate: Date;

    @OneToMany(() => SaleProducts, saleProduct => saleProduct.sale, {cascade: ['insert']})
    products: SaleProducts[];
}
