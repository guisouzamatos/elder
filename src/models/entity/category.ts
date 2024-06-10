import {AbstractEntity} from "./abstracts/abstractEntity";
import {Column, Entity, PrimaryColumn, OneToMany, BeforeRemove} from "typeorm";
import {NextVal} from "./abstracts/nextVal";
import {Product} from "./product";

@Entity({name: 'tb_category'})
export class Category extends AbstractEntity {

    @PrimaryColumn({name: 'id_category'})
    id: number;

    @Column({name: 'description'})
    description: string;

    @OneToMany(() => Product, product => product.category, {cascade: ["remove", "soft-remove"]})
    products: Product[];
}
