<script>
import { mapGetters } from "vuex";
import ProductItemSmall from "../components/products/product-item-small.vue";
import { Axios } from '../http';
import { formatDate } from "../common";

export default {
    data() {
        return {
            products: Array
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn", "getAccessToken"])
    },
    methods: {
        formatDate(value) {
            return formatDate(value)
        },
        fetchProducts() {
            Axios
                .get('/products', {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken}`
                    }
                })
                .then(res => {
                    this.products = res.data.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    mounted() {
        this.fetchProducts()
    },
    components: { ProductItemSmall }
};

</script>

<template>
    <div class="mt-3">
        <h1>Recomendations for you</h1>
        <div class="row row-cols-4 gy-5">
            <div v-for="(product, idx) in products" class="col justify-content-center">

                <ProductItemSmall 
                    :idx="idx" 
                    :id="product.id"
                    :title="product.name" 
                    :price="product.price"
                    :address="product.address" 
                    :timestamp="formatDate(product.createdAt)"
                    :images="product.images"
                    :user="product.user"
                />

            </div>
        </div>
    </div>
</template>
