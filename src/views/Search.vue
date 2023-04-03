<script>
import ProductsList from '../components/products/products-list.vue';

export default {
    components: { ProductsList },
    data() {
        return {
            products: [],
            query: '',
        }
    },
    methods: {
        fetchProducts() {
            this.products = Array(10);
        },
        checkQueryNotEmpty() {
            this.query = this.$route.query.q;
            if (!this.query) this.$router.push('/');
        }
    },
    mounted() {
        this.checkQueryNotEmpty();
        this.fetchProducts();
    }
}

</script>


<template>
    <div class="mt-3">
        <h1>Products for search "{{ this.query }}"</h1>
        <div class="row">
            <div class="col-3">
                Categories
            </div>
            <div class="col-8">
                <ProductsList :products="products" />
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>