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
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>


<template>
    <div class="d-flex flex-row">

        <ProfileNavbar :cur-page="'notifications'" />

        <div class="kekos">
            <h2 class="mb-3">Notifications</h2>

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