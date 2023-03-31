import { Min } from "class-validator";
import type { Category } from "src/categories/entities/category.entity";
import type { Image } from "src/images/entities/image.entity";
import type { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @ManyToOne('User', 'products', {
        onDelete: "CASCADE"
    })
    user: User;

    @ManyToOne('Category', 'products', {
        onDelete: "CASCADE"
    })
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

    @OneToMany('Image', 'product', {
        onDelete: "CASCADE"
    })
    images: Image[]
}

export default Product;