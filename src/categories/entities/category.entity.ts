import { IsNotEmpty, Min } from 'class-validator';
import type { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'categories'
})
export class Category {
    @PrimaryGeneratedColumn('identity', {
        generatedIdentity: 'ALWAYS',
    })
    id: number;
    
    @Column({
        length: 64,
        nullable: false,
        unique: true
    })
    @IsNotEmpty()
    name: String;


    @ManyToOne('Category', {
        nullable: true,
        onDelete: "CASCADE"
    })
    parentCategory: Category;


    @OneToMany('Product', 'category', {
        onDelete: "CASCADE"
    })
    products: Product[];
}

export default Category;
