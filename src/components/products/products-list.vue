<script>
import ProductItem from './product-item.vue';
import moment from 'moment'


export default {
    components: {
        ProductItem
    },
    props: {
        products: Array,
        meta: null,
        links: null
    },
    methods: {
        formatDate(value) {
            return moment(value).format('DD.MM.YYYY')
        }
    },
    mounted() { }
}

</script>


<template>
    <div v-for="(product, idx) in products" class="mb-3">
        <ProductItem 
            :idx="idx" 
            :title="product.name"
            :description="product.description"
            :price="product.price" 
            :address="product.address" 
            :timestamp="formatDate(product.createdAt)" 
            :images="product.images"
        />
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li v-if="links.previous" class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li v-if="meta.currentPage > 1" class="page-item"><a class="page-link" href="#">{{ meta.currentPage - 1 }}</a></li>
            <li class="page-item active"><a class="page-link" href="#">{{ meta.currentPage }}</a></li>
            <li v-if="meta.currentPage < meta.totalPages" class="page-item"><a class="page-link" href="#">{{ meta.currentPage + 1 }}</a></li>
            <li v-if="links.next" class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>