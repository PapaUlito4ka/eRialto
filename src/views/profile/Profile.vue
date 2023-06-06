<script>
import { mapGetters } from "vuex";
import { Axios } from '../../http';
import ProductsList from '../../components/products/products-list.vue';

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFirstname", "getAccessToken"])
    },
    components: { ProductsList },
    data() {
        return {
            firstname: '',
            lastname: '',
            imageUrl: '',
            email: '',

            products: [],
            meta: new Object(),
            links: new Object()
        }
    },
    methods: {
        fetchUserProfile() {
            Axios
                .get('/user')
                .then(res => {
                    const data = res.data
                    this.firstname = data.firstname
                    this.lastname = data.lastname
                    this.imageUrl = data.image
                    this.email = data.email
                })
                .catch(e => {
                    // console.log(e.response)
                })
        },
        fetchProducts() {
            Axios
                .get('/user/products')
                .then(res => {
                    const data = res.data
                    this.products = data.data
                    this.meta = data.meta
                    this.links = data.links
                })
                .catch(e => {
                    // console.log(e.response)
                })
        },
    },
    mounted() {
        this.fetchUserProfile()
        this.fetchProducts()
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

            <div class="mt-3 d-flex flex-column align-items-start">
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <a href="#" style="color: red;">My products</a>
                    </div>
                    <div class="mb-2">
                        <a href="#">My reviews</a>
                    </div>
                    <div>
                        <a href="#">Favourites</a>
                    </div>
                </div>
                <div class="w-100">
                    <hr>
                </div>
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <a href="#">Messages</a>
                    </div>
                    <div>
                        <a href="#">Notifications</a>
                    </div>
                </div>
                <div class="w-100">
                    <hr>
                </div>
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <a href="#">Profile</a>
                    </div>
                    <div>
                        <a href="/profile/settings">Settings</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="kekos">
            <h2 class="mb-3">My products</h2>
            <div class="mb-3">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Archived</a>
                    </li>
                </ul>
            </div>

            <ProductsList 
                :products="products"
                :meta="meta"
                :links="links" 
            />
        </div>

    </div>
</template>