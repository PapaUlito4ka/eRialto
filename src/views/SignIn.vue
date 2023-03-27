<script>
import { mapMutations } from 'vuex';

export default {
    data: () => {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapMutations(["setUser", "setAccessToken"]),
        login(e) {
            e.preventDefault()
            this.setUser(this.email)
            this.setAccessToken('espinWAKPOFE12321lA{EPFAOg}')
            this.$router.push('/')
        }
    }
}

</script>

<template>
    <h1>Sign in page</h1>
    <form @submit.prevent="login">
        <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="emailInput">
        </div>
        <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="passwordInput">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>