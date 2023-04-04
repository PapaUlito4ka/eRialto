import { Min } from "class-validator";
import type { Category } from "src/categories/entities/category.entity";
import type { Image } from "src/images/entities/image.entity";
import { CreateUpdateMixin } from "../../mixins/create-update.mixin";
import type { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Product extends CreateUpdateMixin {
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

    @Column({
        length: 128,
        nullable: false
    })
    address: string;

    @OneToMany('Image', 'product', {
        onDelete: "CASCADE"
    })
    images: Image[]
}

export default Product;