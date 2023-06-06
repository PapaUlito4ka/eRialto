<script>
import { mapGetters } from "vuex";
import { Axios } from '../../http';
import ProfileNavbar from '../../components/profile/navbar.vue';

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFullname"])
    },
    components: { ProfileNavbar },
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

        <ProfileNavbar :cur-page="'profile'" />

        <div class="kekos">
            <h2 class="mb-3">Profile</h2>
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