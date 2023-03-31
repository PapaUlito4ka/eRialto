import type { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    name: String;

    @OneToMany('Product', 'category', {
        onDelete: "CASCADE"
    })
    products: Product[];
}

export default Category;
