<script>
import { mapMutations } from 'vuex';
import { Axios } from '../../http';

export default {
    data: () => {
        return {
            email: "",
            password: "",
            displaySpinner: false,
            errorMessage: ""
        }
    },
    methods: {
        ...mapMutations(["setUser", "setAccessToken", "setRefreshToken"]),
        toggleSpinner() {
            this.displaySpinner = !this.displaySpinner
        },
        setErrorMessage(errorMessage) {
            this.errorMessage = errorMessage
        },
        login(e) {
            e.preventDefault()
            this.toggleSpinner()
            this.setErrorMessage("")
            Axios
                .post('/auth/sign-in', {
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    const data = res.data
                    this.setUser(data.user)
                    this.setAccessToken(data.access_token)
                    this.setRefreshToken(data.refresh_token)
                    this.$router.push('/')
                })
                .catch(e => {
                    this.setErrorMessage(e.response.data.message)
                    this.toggleSpinner()
                })
        }
    },
    mounted() {

    },
}

</script>

<template>
    <h1>Sign in page</h1>
    <form v-if="!displaySpinner" @submit.prevent="login">
        <div v-if="errorMessage" class="mb-2">
            <p class="text-danger">{{ errorMessage }}</p>
        </div>
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
    <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>