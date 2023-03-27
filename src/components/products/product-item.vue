<script>

export default {
    props: {
        title: String,
        price: Number,
        description: String,
        imgUrl: String
    }
}

</script>


<template>
    <div class="d-flex flex-row card">
        <div class="me-3">
            <img src="{{ imgUrl || 'https://placehold.co/175x150' }}">
        </div>
        <div class="d-flex flex-column flex-fill">
            <p class="m-0 fw-bold fs-5">{{ title }}</p>
            <p class="m-0 fs-5">{{ price }}&nbsp;$</p>
            <small class="m-0 text-body-secondary">{{ description }}</small>
        </div>
    </div>
</template>