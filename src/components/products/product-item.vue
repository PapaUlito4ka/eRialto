<script>

export default {
    props: {
        idx: Number,
        title: String,
        price: Number,
        description: String,
        address: String,
        timestamp: String,
        images: Array
    }
}

</script>


<template>
    <div class="d-flex flex-row card p-3">
        <div :id="`carouselExampleIndicators${idx}`" class="carousel slide me-3" data-bs-ride="true" style="width: 200px; height: 175px;">
            <div class="carousel-indicators">
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="0"
                    class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div v-for="image in images" class="carousel-item active">
                    <img :src="image.path ? image.path : 'https://placehold.co/200x175'" onclick="location.href='#';" class="rounded"
                        style="cursor: pointer;">
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

        <div class="d-flex flex-column flex-fill">
            <div class="d-flex flex-row justify-content-between">
                <h5 class="card-title" onclick="location.href='#';" style="cursor: pointer;">{{ title }}</h5>
                <div><a style="cursor: pointer;"><i class="bi bi-heart fs-5"></i></a></div>
            </div>
            <p class="m-0 fs-5">{{ price }}&nbsp;$</p>
            <small class="m-0 text-body-secondary mb-1">{{ description }}</small>
            <small class="m-0 text-body-secondary">{{ address }}</small>
            <small class="m-0 text-body-secondary">{{ timestamp }}</small>
        </div>
    </div>
</template>