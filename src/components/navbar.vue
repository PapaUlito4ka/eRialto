<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    data() {
        return {
            query: ''
        }
    },
    methods: {
        // searchProducts(e) {
        //     e.preventDefault();
        //     this.$router.push(`/search?q=${this.query}`);
        // }
    }
}
</script>


<template>
    <div class="sticky-top" style="background-color: #fff;">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid px-0">
                <router-link to="/" class="navbar-brand fs-4">eRialto</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div v-if="isLoggedIn" class="navbar-nav" id="nav">
                        <router-link to="#" class="nav-link" style="padding-top: 6px;"><i class="bi bi-heart fs-5"></i></router-link>
                        <router-link to="#" class="nav-link me-3 py-1"><i class="bi bi-chat fs-5"></i></router-link>
                        <router-link to="/profile" class="nav-link me-3">My products</router-link>
                        <li class="nav-item dropdown me-3">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                aria-expanded="false">Artem</a>
                            <ul class="dropdown-menu">
                                <li><router-link to="/profile" class="dropdown-item">My profile</router-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><router-link to="/logout" class="dropdown-item">Logout</router-link></li>
                            </ul>
                        </li>
                        <router-link to="#" class="btn btn-primary" role="button">Publish product</router-link>
                    </div>
                    <div v-else class="navbar-nav" id="nav">
                        <router-link to="/sign-in" class="nav-link">Sign&nbsp;in</router-link>
                        <router-link to="/sign-up" class="nav-link">Sign&nbsp;up</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="isLoggedIn" class="d-flex flex-row mt-2 pb-4">
            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Categories
            </button>
            <div class="input-group">
                <form class="d-flex flex-fill" action="/search">
                    <input v-model="query" type="text" class="form-control" placeholder="Search products"
                        aria-label="Username" aria-describedby="basic-addon1" name="q">
                </form>
            </div>
        </div>
    </div>
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
</div></template>