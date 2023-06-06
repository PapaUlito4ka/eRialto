<script>
import { mapGetters } from "vuex";
import { Axios } from '../../http';

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFullname"])
    },
    props: {
        curPage: String
    },
    data() {
        return {
            imageUrl: '',
        }
    },
    methods: {
        fetchUserProfile() {
            Axios
                .get('/user')
                .then(res => {
                    const data = res.data
                    this.imageUrl = data.image
                })
                .catch(e => {
                    console.log(e.response)
                })
        }
    },
    mounted() {
        this.fetchUserProfile()
    }
}
</script>


<template>
    <div class="d-flex flex-row">

        <div class="me-3">
            <div class="mb-3 d-flex flex-column align-items-center">
                <img :src="imageUrl ? imageUrl : 'https://placehold.co/250x250'" class="rounded mb-2">
                <p class="fs-5 fw-semibold">{{ getFullname }}</p>
            </div>

            <div class="mt-3 d-flex flex-column align-items-start">
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <router-link v-if="curPage === 'products'" to="/profile/products" class="curPage">My Products</router-link>
                        <router-link v-else to="/profile/products">My Products</router-link>
                    </div>
                    <div class="mb-2">
                        <router-link v-if="curPage === 'reviews'" to="/profile/reviews" class="curPage">My Reviews</router-link>
                        <router-link v-else to="/profile/reviews">My reviews</router-link>
                    </div>
                    <div>
                        <router-link v-if="curPage === 'favourites'" to="/profile/favourites" class="curPage">Favourites</router-link>
                        <router-link v-else to="/profile/favourites">Favourites</router-link>
                    </div>
                </div>
                <div class="w-100">
                    <hr>
                </div>
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <router-link v-if="curPage === 'messages'" to="/profile/messages" class="curPage">Messages</router-link>
                        <router-link v-else to="/profile/messages">Messages</router-link>
                    </div>
                    <div>
                        <router-link v-if="curPage === 'notifications'" to="/profile/notifications" class="curPage">Notifications</router-link>
                        <router-link v-else to="/profile/notifications">Notifications</router-link>
                    </div>
                </div>
                <div class="w-100">
                    <hr>
                </div>
                <div class="d-flex flex-fill flex-column">
                    <div>
                        <router-link v-if="curPage === 'profile'" to="/profile" class="curPage">Profile</router-link>
                        <router-link v-else to="/profile">Profile</router-link>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>


<style scoped>
.preview-image {
    cursor: pointer;
    height: 100%;
    width: 100%;
    object-fit: contain;
}
.curPage {
    color: red;
}
</style>