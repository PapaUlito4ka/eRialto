<script>
import { Axios } from '../../http';
import ProductsList from '../../components/products/products-list.vue';

export default {
    components: { ProductsList },
    data() {
        return {
            products: [],
            meta: new Object(),
            links: new Object(),
            query: '',
        }
    },
    methods: {
        fetchProducts() {
            Axios
                .get(`/products?search=${this.query}`)
                .then(res => {
                    const data = res.data
                    this.products = data.data
                    this.meta = data.meta
                    this.links = data.links
                })
                .catch(e => {
                    console.log(e)
                })
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
    <div class="mt-2">
        <h1>Products for search "{{ this.query }}"</h1>
        <div class="row">
            <div class="col-3">
                Categories
            </div>
            <div class="col-8">
                <ProductsList 
                    :products="products"
                    :meta="meta"
                    :links="links" 
                />
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>