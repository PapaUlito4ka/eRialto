<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    }
};
</script>

<template>
    <h1>Home page</h1>
    <p>{{ isLoggedIn }}</p>
</template>
