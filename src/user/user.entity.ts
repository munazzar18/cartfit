import { Exclude } from "class-transformer";
import { Orders } from "src/orders/orders.entity";
import { Products } from "src/products/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        nullable: false,
        unique: true,
    })
    mobile: string;

    @Column({
        nullable: false,
    })
    address: string;

    @Column({
        nullable: false
    })
    password: string;

    @OneToMany(() => Products, (product) => product.user)
    @JoinColumn({ name: 'products' })
    products: Products[]

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'orders' })
    orders: Orders[]
}


export class serializedUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;

    @Exclude()
    password: string

    constructor(partial: Partial<serializedUser>) {
        Object.assign(this, partial)
    }
}