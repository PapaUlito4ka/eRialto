<script>
import { mapGetters } from "vuex";
import { Axios } from '../../http';
import ProductsList from '../../components/products/products-list.vue';
import ProfileNavbar from '../../components/profile/navbar.vue';

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFirstname", "getAccessToken"])
    },
    components: { ProductsList, ProfileNavbar },
    data() {
        return {
            firstname: '',
            lastname: '',
            imageUrl: '',
            email: '',
            selected: true,

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
        fetchActiveProducts() {
            this.selected = true
            const queryParams = new URLSearchParams({ 'filter.isArchived': false })
            Axios
                .get(`/user/products?${queryParams.toString()}`)
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
        fetchArchivedProducts() {
            this.selected = false
            const queryParams = new URLSearchParams({ 'filter.isArchived': true })
            Axios
                .get(`/user/products?${queryParams.toString()}`)
                .then(res => {
                    const data = res.data
                    this.products = data.data
                    this.meta = data.meta
                    this.links = data.links
                })
                .catch(e => {
                    // console.log(e.response)
                })
        }
    },
    mounted() {
        this.fetchUserProfile()
        this.fetchProducts()
    }
}
</script>


<template>
    <div class="d-flex flex-row">

        <ProfileNavbar :cur-page="'products'" />

        <div class="kekos">
            <h2 class="mb-3">My products</h2>
            <div class="mb-3">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a v-if="selected" class="nav-link active" href="#" @click="fetchActiveProducts">Active</a>
                        <a v-else class="nav-link" href="#" @click="fetchActiveProducts">Active</a>
                    </li>
                    <li class="nav-item">
                        <a v-if="!selected" class="nav-link active" href="#" @click="fetchArchivedProducts">Archived</a>
                        <a v-else class="nav-link" href="#" @click="fetchArchivedProducts">Archived</a>
                    </li>
                </ul>
            </div>

            <ProductsList 
                :products="products"
                :meta="meta"
                :links="links"
                :profile-view="true"
            />
        </div>

    </div>
</template>