<script>
import { mapGetters } from "vuex"

export default {
    props: {
        idx: Number,
        title: String,
        price: Number,
        imgUrl: String,
        address: String,
        timestamp: String,
        images: Array,
        user: Object
    },
    computed: {
        ...mapGetters(["getUserId"])
    },
}

</script>


<template>
    <div class="card">

        <div :id="`carouselExampleIndicators${idx}`" class="carousel slide card-img-top" data-bs-ride="true">
            <div class="carousel-indicators">
                <button v-if="images.length" type="button" :data-bs-target="`#carouselExampleIndicators${idx}`"
                    data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button v-for="(image, i) in images.slice(1)" type="button"
                    :data-bs-target="`#carouselExampleIndicators${idx}`" :data-bs-slide-to="`${i + 1}`"
                    :aria-label="`Slide ${i + 2}`"></button>
            </div>
            <div class="carousel-inner">
                <div v-if="images.length" class="carousel-item active">
                    <img :src="images.length ? images[0].path : 'https://placehold.co/150x125'" onclick="location.href='#';"
                        class="rounded preview-image">
                </div>
                <div v-for="image in images.slice(1)" class="carousel-item">
                    <img :src="image.path ? image.path : 'https://placehold.co/150x125'" onclick="location.href='#';"
                        class="rounded preview-image">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="`#carouselExampleIndicators${idx}`"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="`#carouselExampleIndicators${idx}`"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
                <h5 class="card-title" onclick="location.href='#';" style="cursor: pointer;">{{ title }}</h5>
                <div v-if="getUserId !== user.id"><a style="cursor: pointer;"><i class="bi bi-heart fs-5"></i></a></div>
            </div>
            <p class="m-0 fs-5 fw-bold">{{ price }}&nbsp;$</p>
            <small class="m-0 text-body-secondary">{{ address }}</small><br />
            <small class="m-0 text-body-secondary">{{ timestamp }}</small>
        </div>
    </div>
</template>

<style scoped>
.preview-image {
    cursor: pointer;
    height: 225px;
    width: 100%;
    object-fit: contain;
}
</style>