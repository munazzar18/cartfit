import { Products } from "src/products/product.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    userId: number;

    @Column({ nullable: false })
    productId: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(() => Products, { cascade: true })
    @JoinTable({
        name: "products_orders",
        joinColumn: { name: "orderId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "productId", referencedColumnName: "id" },
    })
    products: Products[]

}

