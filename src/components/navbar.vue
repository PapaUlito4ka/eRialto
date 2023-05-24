<script>
import { mapGetters } from "vuex";
import { Axios } from '../http';

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFirstname", "getAccessToken"])
    },
    data() {
        return {
            query: '',
            showCategoriesLoading: true,

            categories: null,
            categoriesData: null
        }
    },
    methods: {
        showCurrentCategory(category) {
            let categories = []
            for (let cat in this.categories) {
                categories.push(cat)
            }
            categories = categories.filter(cat => cat != category)
            for (let cat of categories) {
                this.categories[cat] = false
            }
            this.categories[category] = true
        },
        toggleCategoriesLoading() {
            this.showCategoriesLoading = !this.showCategoriesLoading
        },
        setCategoriesData(categoriesData) {
            this.categoriesData = categoriesData
            let key = true
            this.categories = new Object()
            for (let rootCategory in this.categoriesData) {
                this.categories[`show${rootCategory.replace(' ', '')}`] = key
                key = false
            }
        },
        fetchCategories() {
            if (this.categoriesData) return
            Axios
                .get('/categories', {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken}`
                    }
                })
                .then(res => {
                    this.setCategoriesData(res.data)
                    this.toggleCategoriesLoading()
                })
                .catch(e => {
                })
        }
    },
    mounted() {
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
                        <router-link to="#" class="nav-link" style="padding-top: 6px;"><i
                                class="bi bi-heart-fill fs-5"></i></router-link>
                        <router-link to="#" class="nav-link me-3 py-1"><i class="bi bi-chat-fill fs-5"></i></router-link>
                        <router-link to="/profile" class="nav-link me-3">My products</router-link>
                        <li class="nav-item dropdown me-3">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                aria-expanded="false">{{ getFirstname }}</a>
                            <ul class="dropdown-menu">
                                <li><router-link to="/profile" class="dropdown-item">My profile</router-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><router-link to="/logout" class="dropdown-item">Logout</router-link></li>
                            </ul>
                        </li>
                        <router-link to="/create-product" class="btn btn-primary" role="button">Publish
                            product</router-link>
                    </div>
                    <div v-else class="navbar-nav" id="nav">
                        <router-link to="/sign-in" class="nav-link">Sign&nbsp;in</router-link>
                        <router-link to="/sign-up" class="nav-link">Sign&nbsp;up</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="isLoggedIn" class="d-flex flex-row mt-2 pb-4">
            <button @click="fetchCategories()" type="button" class="btn btn-primary me-2" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
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
    <div class="modal modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="showCategoriesLoading" class="spinner-border d-flex justify-content-center" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else class="d-flex flex-row">
                        <div class="flex-shrink-1 flex-column">
                            <div v-for="(childCategories, category) in categoriesData"
                                @mouseover="showCurrentCategory(`show${category}`)" class="mb-2 flex-fill">
                                <a class="d-flex btn btn-light fs-4" href="#" role="button">{{ category.replace(' ', '&nbsp;') }}</a>
                            </div>
                        </div>

                        <div v-for="(childCategories, category) in categoriesData">
                            <div v-if="categories && categories[`show${category}`]" class="mx-4 d-flex flex-column">
                                <div class="flex-shrink-1 fs-4 mb-2">
                                    <a class="d-flex category-link" href="#">{{ category }}</a>
                                </div>
                                <div class="row row-cols-auto">
                                    <div v-for="childCategory in childCategories" class="mb-2">
                                        <a class="d-flex category-link" href="#" role="button">{{ childCategory }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div style="height: 100px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.category-link {
    text-decoration: none;
    color: black;
}

.category-link:hover {
    color: red;
}
</style>