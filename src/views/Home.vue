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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

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
