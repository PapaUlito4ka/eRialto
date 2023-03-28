import { Min } from "class-validator";
import type { Category } from "src/categories/entities/category.entity";
import type { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @ManyToOne('User', 'products')
    user: User;

    @ManyToOne('Category', 'products')
    category: Category;

    @Column({
        length: 128,
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    description: string;

    @Column({
        nullable: false,
    })
    @Min(1)
    price: Number;
}

export default Product;