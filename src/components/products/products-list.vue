<script>
    import ProductItem from './product-item.vue';

    export default {
        components: {
            ProductItem
        },
        data() {
            return {
                products: []
            }
        }
        methods: {
            fetchProducts() {
                // TODO: fetch products
            }
        },
        mounted() {
            this.fetchProducts();
        }
    }

</script>


<template>

    <ProductItem v-for="product in products" 
        :title="product.title"
        :price="product.price"
        :description="product.description"
        :imgUrl="product.imgUrl"
    />

</template>