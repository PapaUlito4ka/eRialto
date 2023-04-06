<script>
import ProductsList from '../components/products/products-list.vue';

export default {
    components: { ProductsList },
    data() {
        return {
            products: [],
        }
    },
    methods: {
        fetchProducts() {
            this.products = Array(10);
        },
    },
    mounted() {
        this.fetchProducts();
    }
}
</script>


<template>
    <div class="d-flex flex-row">

        <div class="me-3">
            <div class="mb-3 d-flex flex-column align-items-center">
                <img src="https://placehold.co/250x250" class="rounded mb-2">
                <p class="fs-5 fw-semibold">Artem Martyakhin</p>
            </div>

            <div class="mt-3 d-flex flex-column align-items-center">
                <p>Profile buttons</p>
            </div>
        </div>

        <div class="kekos">
            <div class="mb-3">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Archived</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>

            <ProductsList :products="products" />
        </div>

    </div>
</template>