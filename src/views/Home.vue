<script>
import { mapGetters } from "vuex";
import ProductItemSmall from "../components/products/product-item-small.vue";

export default {
    data() {
        return {
            items: Array(100)
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    mounted() {
    },
    components: { ProductItemSmall }
};

</script>

<template>
    <div class="mt-3">
        <h1>Recomendations for you</h1>
        <div class="row row-cols-4 gy-5">
            <div v-for="(item, idx) in items" class="col justify-content-center">

                <ProductItemSmall :idx="idx" :title="'Жилет Stone Island Hidden Reflective'" :price="10499"
                    :address="'Санкт-Петербург, Ладожская'" :date="'12.03.2023'" />

            </div>
        </div>
    </div>
</template>
