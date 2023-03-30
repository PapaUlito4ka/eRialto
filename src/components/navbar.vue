<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    }
}
</script>


<template>
    <div class="sticky-top bg-body-tertiary">
        <nav class="navbar navbar-expand-lg">
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
        <div class="d-flex flex-row mt-2 pb-4">
            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Categories
            </button>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search products" aria-label="Username"
                    aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
</template>