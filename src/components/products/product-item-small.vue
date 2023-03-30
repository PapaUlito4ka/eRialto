<script>

export default {
    props: {
        idx: Number,
        title: String,
        price: Number,
        imgUrl: String,
        address: String,
        date: String
    }
}

</script>


<template>
    <div class="card">

        <div :id="`carouselExampleIndicators${idx}`" class="carousel slide card-img-top" data-bs-ride="true">
            <div class="carousel-indicators">
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" :data-bs-target="`#carouselExampleIndicators${idx}`" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="imgUrl ? imgUrl : 'https://placehold.co/150x125'" class="card-img-top"
                        onclick="location.href='#';" style="cursor: pointer;">
                </div>
                <div class="carousel-item">
                    <img :src="imgUrl ? imgUrl : 'https://placehold.co/150x125'" class="card-img-top"
                        onclick="location.href='#';" style="cursor: pointer;">
                </div>
                <div class="carousel-item">
                    <img :src="imgUrl ? imgUrl : 'https://placehold.co/150x125'" class="card-img-top"
                        onclick="location.href='#';" style="cursor: pointer;">
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
            <h5 class="card-title" onclick="location.href='#';" style="cursor: pointer;">{{ title }}</h5>
            <p class="m-0 fs-5 fw-bold">{{ price }}&nbsp;$</p>
            <small class="m-0 text-body-secondary">{{ address }}</small><br />
            <small class="m-0 text-body-secondary">{{ date }}</small>
        </div>
    </div>
</template>