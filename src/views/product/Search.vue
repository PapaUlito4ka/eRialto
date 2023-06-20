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

            priceFrom: null,
            priceTo: null,
            sellerRatingFrom: null,
            sellerRatingTo: null,
            sortBy: '0'
        }
    },
    methods: {
        fetchProducts() {
            const searchParams = {
                search: this.query,
                sortBy: 'createdAt:DESC'
            }
            const availableOrder = ['createdAt:DESC', 'price:DESC', 'price:ASC'];
            if (this.priceFrom) {
                searchParams['filter.price'] = `$gte:${this.priceFrom}`
            }
            if (this.priceTo) {
                searchParams['filter.price'] = `$lte:${this.priceTo}`
            }
            if (this.sellerRatingFrom) {
                searchParams['filter.user.avgRating__gte'] = `${this.sellerRatingFrom}`
            }
            if (this.sellerRatingTo) {
                searchParams['filter.user.avgRating__lte'] = `${this.sellerRatingTo}`
            }
            if (this.sortBy) {
                searchParams['sortBy'] = `${availableOrder[parseInt(this.sortBy)]}`
            }
            const queryParams = new URLSearchParams(searchParams)

            console.log(queryParams.toString())
            Axios
                .get(`/products?${queryParams.toString()}`)
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
                        <input v-model="priceFrom" type="text" class="form-control" placeholder="From">
                        <input v-model="priceTo" type="text" class="form-control" placeholder="To">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Sellers rating</label>
                    <div class="input-group">
                        <input v-model="sellerRatingFrom" type="text" class="form-control" placeholder="From">
                        <input v-model="sellerRatingTo" type="text" class="form-control" placeholder="To">
                    </div>
                </div>
                <button type="button" class="btn btn-primary w-100" @click="fetchProducts()">Show products</button>
            </div>
            <div class="col-8">
                <div class="p-3 pt-0">
                    <select v-model="sortBy" class="form-select" aria-label="Default select example" style="width: 200px;" @change="fetchProducts()">
                        <option selected value="0">Default</option>
                        <option value="1">Lower Price</option>
                        <option value="2">Higher Price</option>
                        <option value="0">By Date</option>
                    </select>
                </div>
                <ProductsList :products="products" :meta="meta" :links="links" />
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>