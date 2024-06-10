import {Column, Entity, PrimaryColumn} from "typeorm";
import {AbstractEntity} from "./abstracts/abstractEntity";

@Entity({name: 'tb_supplier'})
export class Supplier extends AbstractEntity {

    @PrimaryColumn({name: 'id_supplier'})
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'contact'})
    contact: string;
}