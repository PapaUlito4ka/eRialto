<script>
import { Axios } from '../http';
import { mapGetters } from 'vuex';
import { formatDate } from '../common';

export default {
    data() {
        return {
            productId: 0,
            product: {
                'createdAt': '',
                'updatedAt': '',
                'id': 0,
                'name': '',
                'description': '',
                'price': 50,
                'address': '',
                'isArchived': false,
                'images': [],
                'user': {
                    'id': 0,
                    'email': '',
                    'profile': {
                        'createdAt': '',
                        'updatedAt': '',
                        'id': 0,
                        'firstname': '',
                        'lastname': ''
                    }
                },
                'category': {
                    'id': 0,
                    'name': ''
                }
            }
        }
    },
    methods: {
        setProductId() {
            this.productId = this.$route.params.id;
        },
        formatDate(value) {
            return formatDate(value)
        },
        fetchProduct() {
            Axios
                .get(`/products/${this.productId}`)
                .then(res => {
                    this.product = res.data;
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    mounted() {
        this.setProductId();
        this.fetchProduct();
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    }
}

</script>


<template>
    <div class="mt-2">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10">
                <div class="card p-3">
                    <div class="d-flex flex-row justify-content-between mb-2">
                        <h2 class="mb-0">{{ product.name }}</h2>
                        <h2 class="mb-0">{{ product.price }}&nbsp;$</h2>
                    </div>
                    <div class="d-flex flex-row mb-4">
                        <small>{{ formatDate(product.createdAt) }}</small>
                    </div>
                    <div class="d-flex flex-row">
                        <a class="btn btn-outline-secondary me-2" href="#" role="button">Update</a>
                        <a class="btn btn-outline-secondary" href="#" role="button">Archive</a>
                    </div>
                </div>

                <div class="d-flex flex-row">
                    <div class="d-flex flex-column card">
                        <div class="p-3">
                            <div id="carouselExampleIndicators" class="carousel slide mb-2 me-0"
                                style="width: 600px; height: 500px;">
                                <div class="carousel-indicators">
                                    <button v-if="product.images.length" type="button"
                                        :data-bs-target="`#carouselExampleIndicators`" data-bs-slide-to="0" class="active"
                                        aria-current="true" aria-label="Slide 1"></button>
                                    <button v-for="(image, i) in product.images.slice(1)" type="button"
                                        :data-bs-target="`#carouselExampleIndicators`" :data-bs-slide-to="`${i + 1}`"
                                        :aria-label="`Slide ${i + 2}`"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div v-if="product.images.length" class="carousel-item active">
                                        <img :src="product.images[0].path"
                                            onclick="location.href='#';" class="rounded preview-image">
                                    </div>
                                    <div v-for="image in product.images.slice(1)" class="carousel-item">
                                        <img :src="image.path"
                                            onclick="location.href='#';" class="rounded preview-image">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>

                            <div class="d-flex flex-row">
                                <img v-for="image in product.images" :src="image.path" onclick="location.href='#';"
                                    class="rounded me-2 icon-image" style="cursor: pointer;">
                            </div>
                        </div>

                        <div class="p-3">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="fs-4 mb-0 fw-light">{{ product.address }}</p>
                                <div class="d-flex dropdown align-items-center">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Show on map
                                    </a>
                                </div>
                            </div>
                            <hr />
                            <p>{{ product.description }}</p>
                        </div>
                    </div>

                    <div class="d-flex flex-column p-3">
                        <div class="d-flex card py-2 px-5 mb-2">
                            <p class="mb-0">
                                <span>{{ product.user.profile.phone || product.user.email }}</span>
                            </p>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <div class="d-flex flex-column me-2">
                                <img src="https://placehold.co/50x50" class="img-fluid" alt="..."
                                    style="border-radius: 50%;">
                            </div>

                            <div class="d-flex flex-column">
                                <small>{{ product.user.profile.firstname }}</small>
                                <small>{{ product.user.profile.rating || 0.0 }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<style scoped>
.preview-image {
    height: 500px;
    width: 100%;
    object-fit: contain;
}

.icon-image {
    height: 50px;
    /* width: 100%; */
    object-fit: contain;
}
</style>