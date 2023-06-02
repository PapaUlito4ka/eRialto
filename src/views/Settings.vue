<script>
import { mapGetters } from "vuex";
import { Axios } from '../http';

export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            imageUrl: '',
            email: '',
            phone: ''
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
                    this.email = data.user.email
                    this.phone = data.phone
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
                <img src="https://placehold.co/250x250" class="rounded mb-2">
                <p class="fs-5 fw-semibold">Artem Martyakhin</p>
            </div>

            <div class="mt-3 d-flex flex-column align-items-start">
                <div class="d-flex flex-fill flex-column">
                    <div class="mb-2">
                        <a href="#">My products</a>
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
                        <a href="#" style="color: red;">Settings</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="kekos">
            <h2 class="mb-3">Settings</h2>
            <form @submit.prevent="saveSettings" class="row g-3">
                <div class="col-md-6">
                    <label for="firstnameId" class="form-label">Firstname</label>
                    <input v-model="firstname" type="text" class="form-control" id="firstnameId">
                </div>
                <div class="col-md-6">
                    <label for="lastnameId" class="form-label">Lastname</label>
                    <input v-model="lastname" type="text" class="form-control" id="lastnameId">
                </div>
                <div class="col-md-6">
                    <label for="phoneId" class="form-label">Phone</label>
                    <input v-model="phone" type="text" class="form-control" id="phoneId">
                </div>
                <div class="col-md-6">
                    <label for="emailId" class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" id="emailId">
                </div>
                <div class="col-12 d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
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
</style>