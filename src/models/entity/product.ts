import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {AbstractEntity} from "./abstracts/abstractEntity";
import {NextVal} from "./abstracts/nextVal";
import {Category} from "./category";
import {Supplier} from "./supplier";

@Entity({ name: 'tb_product' })
export class Product extends AbstractEntity {

    @PrimaryColumn({ name: 'id_product' })
    id: number;

    @Column({ name: 'description', type: 'varchar', length: 255 })
    description: string;

    @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;
}
