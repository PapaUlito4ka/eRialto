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

                <div class="mb-3">
                    <label class="form-label">Price</label>
                    <div class="input-group">
                        <input type="text" aria-label="First name" class="form-control" placeholder="From">
                        <input type="text" aria-label="Last name" class="form-control" placeholder="To">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="ratingId" class="form-label">Sellers rating</label>
                    <input type="range" class="form-range" min="0" max="5" id="ratingId">
                </div>
                <button type="button" class="btn btn-primary w-100">Show products</button>
            </div>
            <div class="col-8">
                <ProductsList :products="products" :meta="meta" :links="links" />
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>