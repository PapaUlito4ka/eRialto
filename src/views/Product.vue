<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            productId: 0,
            title: 'Жилет Stone Island Hidden Reflective',
            price: 10000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nisl neque, et vestibulum dui sollicitudin eu. Sed imperdiet tellus nec lacus accumsan euismod. Sed faucibus, enim ac sagittis rhoncus, ligula libero tincidunt elit, id bibendum quam ipsum in ipsum. Pellentesque odio dui, convallis nec vehicula vitae, consectetur id mauris. Vestibulum nec ipsum et neque interdum commodo. Integer in maximus quam. Etiam efficitur ultrices urna, eu volutpat mauris sollicitudin at. Etiam pretium risus non ipsum facilisis, vitae finibus tellus tempus. Nam vel odio ac massa placerat dictum eget vel mauris. Praesent quis posuere lacus, nec viverra ligula. Cras venenatis ultrices lectus, sit amet vehicula felis vulputate semper. Phasellus imperdiet magna non metus suscipit, ut dignissim lacus facilisis. Sed iaculis lectus leo, lacinia placerat orci mollis quis.',
            address: 'Санкт-Петербург, Ладожская',
            createdAt: '12.03.2023 18:28',

            phone: '+79643705890',
            firstname: 'Artem',
            rating: 4.8
        }
    },
    methods: {
        setProductId() {
            this.productId = this.$route.params.id;
        },
    },
    mounted() {
        this.setProductId();
    },
    computed: {
        ...mapGetters(["isLoggedIn"])
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
                        <h2 class="mb-0">{{ title }}</h2>
                        <h2 class="mb-0">{{ price }}&nbsp;$</h2>
                    </div>
                    <div class="d-flex flex-row mb-4">
                        <small>{{ createdAt }}</small>
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
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                        class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                        aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://placehold.co/600x500" class="rounded" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://placehold.co/600x500" class="rounded" alt="...">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://placehold.co/600x500" class="rounded" alt="...">
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
                                <img :src="imgUrl ? imgUrl : 'https://placehold.co/50x50'" onclick="location.href='#';"
                                    class="rounded me-2" style="cursor: pointer;">
                                <img :src="imgUrl ? imgUrl : 'https://placehold.co/50x50'" onclick="location.href='#';"
                                    class="rounded me-2" style="cursor: pointer;">
                                <img :src="imgUrl ? imgUrl : 'https://placehold.co/50x50'" onclick="location.href='#';"
                                    class="rounded me-2" style="cursor: pointer;">
                            </div>
                        </div>

                        <div class="p-3">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="fs-4 mb-0 fw-light">{{ address }}</p>
                                <div class="d-flex dropdown align-items-center">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Show on map
                                    </a>
                                </div>
                            </div>
                            <hr />
                            <p>{{ description }}</p>
                        </div>
                    </div>

                    <div class="d-flex flex-column p-3">
                        <div class="d-flex card py-2 px-5 mb-2">
                            <p class="mb-0">
                                <nobr>{{ phone }}</nobr>
                            </p>
                        </div>
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <div class="d-flex flex-column me-2">
                                <img src="https://placehold.co/50x50" class="img-fluid" alt="..." style="border-radius: 50%;">
                            </div>

                            <div class="d-flex flex-column">
                                <small>{{ firstname }}</small>
                                <small>{{ rating }}</small>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>