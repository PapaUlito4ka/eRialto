<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(["clearUserSession"]),
        logout() {
            this.clearUserSession();
            this.$router.push('/');
        }
    },
    mounted() {
        this.logout();
    }
}

</script>

<template>
</template>