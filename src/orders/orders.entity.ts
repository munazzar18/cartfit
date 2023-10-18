import { Products } from "src/products/product.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    productId: number;

    @ManyToMany(() => Products, (product) => product.orderId)
    @JoinColumn({ name: 'productId' })
    products: Products[]

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

}

function ManyToMany(arg0: () => typeof Products, arg1: (product: any) => any): (target: Orders, propertyKey: "products") => void {
    throw new Error("Function not implemented.");
}
