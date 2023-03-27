<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    }
}
</script>


<template>
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">eRialto</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div v-if="isLoggedIn" class="navbar-nav" id="nav">
                    <router-link to="/profile" class="nav-link">Profile</router-link>
                    <router-link to="/products" class="nav-link">Products</router-link>
                    <router-link to="/logout" class="nav-link">Logout</router-link>
                </div>
                <div v-else class="navbar-nav" id="nav">
                    <router-link to="/sign-in" class="nav-link">Sign&nbsp;in</router-link>
                    <router-link to="/sign-up" class="nav-link">Sign&nbsp;up</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>