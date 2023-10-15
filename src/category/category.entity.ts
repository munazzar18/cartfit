import { Products } from "src/products/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(() => Products, (product) => product.category)
    @JoinColumn({ name: 'products' })
    products: Products[]
}