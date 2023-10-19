import { Category } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column({ nullable: false })
    title: string;

    @Index({ fulltext: true })
    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column('simple-array', { nullable: false })
    images: string[];

    @Column({ nullable: false })
    specification: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    categoryId: number;


    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category

}

